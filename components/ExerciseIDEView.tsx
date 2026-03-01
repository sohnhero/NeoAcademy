import React, { useState, useEffect, useRef } from "react";

const GLITCH_CHARS = "!@#$%^&*<>?/\\|{}[]~`";

function GlitchText({ text, active }: { text: string; active: boolean }) {
    const [display, setDisplay] = useState(text);
    useEffect(() => {
        if (!active) { setDisplay(text); return; }
        let iter = 0;
        const interval = setInterval(() => {
            setDisplay(text.split("").map((char, idx) =>
                idx < iter ? text[idx] : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            ).join(""));
            if (iter >= text.length) clearInterval(interval);
            iter += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [active, text]);
    return <span>{display}</span>;
}

function ScanlineOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-[200] opacity-[0.015]"
            style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,200,255,0.3) 2px, rgba(0,200,255,0.3) 4px)",
                backgroundSize: "100% 4px"
            }} />
    );
}

const INITIAL_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SecureVault
 * @notice CRITICAL PRODUCTION CONTRACT — Under Evaluation
 */
contract SecureVault {
    mapping(address => uint256) private _balances;
    address private _owner;
    bool private _locked;

    modifier nonReentrant() {
        require(!_locked, "Reentrant call");
        _locked = true;
        _;
        _locked = false;
    }

    constructor() {
        _owner = msg.sender;
    }

    function deposit() external payable nonReentrant {
        require(msg.value > 0, "Zero deposit");
        _balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) external nonReentrant {
        require(_balances[msg.sender] >= amount, "Insufficient");
        _balances[msg.sender] -= amount;
        // TODO: Fix vulnerability below ↓
        (bool ok,) = msg.sender.call{value: amount}("");
        require(ok, "Transfer failed");
    }
}`;

const BUGGY_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// ⚠️ CRITICAL BUG INJECTED — REENTRANCY VULNERABILITY DETECTED
contract SecureVault {
    mapping(address => uint256) private _balances;
    address private _owner;

    constructor() {
        _owner = msg.sender;
    }

    function deposit() external payable {
        _balances[msg.sender] += msg.value;
    }

    // VULNERABLE: Balance not decremented before transfer!
    function withdraw(uint256 amount) external {
        require(_balances[msg.sender] >= amount, "Insufficient");
        (bool ok,) = msg.sender.call{value: amount}("");
        require(ok, "Transfer failed");
        _balances[msg.sender] -= amount; // ← EXPLOIT HERE
    }

    // BACKDOOR: No access control
    function emergencyDrain() external {
        payable(msg.sender).transfer(address(this).balance);
    }
}`;

const SIMULATION_EVENTS = [
    { at: 270, type: "client", msg: "Alexandre (CTO Nexion): Le contrat doit être déployé dans 15min. Les investisseurs regardent. C'est 2M€ en jeu. MAINTENANT." },
    { at: 180, type: "incident", msg: "PROD ALERT: Memory leak detected on node-3. Gas costs spiking 340%. Deploy window closing." },
    { at: 120, type: "bug", msg: "CRITICAL VULNERABILITY INJECTED BY ATTACKER" },
    { at: 60, type: "client", msg: "Alexandre: Pourquoi ça prend autant de temps?! Vos concurrents auraient déjà fini. RÉPONDEZ." },
];

const CONSOLE_INIT = [
    { type: "system", text: "Neural IDE v4.2.1 — Evaluation Environment Initialized" },
    { type: "system", text: "Hardhat network started on http://127.0.0.1:8545" },
    { type: "info", text: "Compiling contracts... solc 0.8.19" },
    { type: "success", text: "2 contracts compiled successfully" },
    { type: "warn", text: "WARNING: Contract size approaching limit (22.4kb / 24kb)" },
    { type: "prompt", text: "" },
];

const FILE_TREE = [
    {
        name: "contracts", type: "folder", open: true, children: [
            { name: "SecureVault.sol", type: "sol", active: true },
            {
                name: "interfaces", type: "folder", children: [
                    { name: "IVault.sol", type: "sol" },
                ]
            },
        ]
    },
    {
        name: "test", type: "folder", children: [
            { name: "vault.test.js", type: "js" },
        ]
    },
    {
        name: "scripts", type: "folder", children: [
            { name: "deploy.js", type: "js" },
        ]
    },
    { name: "hardhat.config.js", type: "js" },
    { name: ".env", type: "env" },
];

const fileIcon = (type: string) => {
    if (type === "folder") return "📁";
    if (type === "sol") return "◈";
    if (type === "js") return "⬡";
    if (type === "env") return "⚙";
    return "·";
};

function FileNode({ node, depth = 0 }: { key?: React.Key; node: any; depth?: number }) {
    const [open, setOpen] = useState(node.open || false);
    return (
        <div>
            <div
                onClick={() => node.type === "folder" && setOpen(!open)}
                className="flex items-center gap-1.5 py-[3px] px-2 cursor-pointer group transition-all duration-150"
                style={{ paddingLeft: `${8 + depth * 14}px` }}
            >
                <span style={{ color: node.active ? "#00d4ff" : node.type === "folder" ? "#4a90d9" : "#556080", fontSize: 11 }}>
                    {node.type === "folder" ? (open ? "▾" : "▸") : fileIcon(node.type)}
                </span>
                <span style={{
                    fontSize: 11.5,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: node.active ? "#00d4ff" : "#8899bb",
                    fontWeight: node.active ? 600 : 400,
                }} className="group-hover:text-white transition-colors">
                    {node.name}
                </span>
                {node.active && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00d4ff", marginLeft: "auto", boxShadow: "0 0 6px #00d4ff" }} />}
            </div>
            {node.children && open && node.children.map((child: any, i: number) => (
                <FileNode key={i} node={child} depth={depth + 1} />
            ))}
        </div>
    );
}

import { X, Zap } from "lucide-react";

interface ExerciseIDEViewProps {
    exerciseType: 'course' | 'module' | 'final';
    title: string;
    isLiveSession?: boolean;
    coachName?: string;
    description: string;
    instructions: string[];
    isSimulationMode?: boolean;
    simulationEvents?: any[];
    onClose?: () => void;
    onCancel?: () => void;
    onSubmit: (code: string, output: number) => void;
    onTestRemediation?: () => void;
    timeLimit?: number;
}

export default function ExerciseIDEView({
    title, description, instructions, isSimulationMode, simulationEvents,
    onClose, onCancel, onSubmit, exerciseType, isLiveSession, coachName, timeLimit, onTestRemediation
}: ExerciseIDEViewProps) {
    const TOTAL = timeLimit || 300;
    const [time, setTime] = useState(TOTAL);
    const [code, setCode] = useState(INITIAL_CODE);
    const [console_, setConsole] = useState(CONSOLE_INIT);
    const [panelTab, setPanelTab] = useState("terminal");
    const [incident, setIncident] = useState(false);
    const [bugInjected, setBugInjected] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [screenShock, setScreenShock] = useState(false);
    const [phase, setPhase] = useState("active"); // active | warning | critical | submitted
    const [compiling, setCompiling] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const timerRef = useRef<any>(null);
    const consoleEndRef = useRef<HTMLDivElement>(null);

    const addLog = (type: string, text: string) => setConsole(p => [...p, { type, text }]);

    const shock = (duration = 800) => {
        setScreenShock(true);
        setTimeout(() => setScreenShock(false), duration);
    };

    useEffect(() => {
        if (submitted) return;
        timerRef.current = setInterval(() => {
            setTime(prev => {
                if (prev <= 0) { clearInterval(timerRef.current); return 0; }
                const next = prev - 1;
                // Use simulation events if provided, else rely on manual triggers or default mock
                let activeEvents = SIMULATION_EVENTS;
                if (simulationEvents && simulationEvents.length > 0) {
                    activeEvents = simulationEvents.map((e: any) => ({
                        at: e.triggerAtSeconds !== undefined ? e.triggerAtSeconds : e.at,
                        type: e.type.replace('client_message', 'client').replace('bug_injection', 'bug'),
                        msg: e.payload !== undefined ? e.payload : (e.msg || e.message)
                    }));
                }

                // Map event "time" or "at" based on the format used
                const ev = activeEvents.find(e => (e.at === next) || ((e as any).time === TOTAL - next));
                if (ev && isSimulationMode) {
                    if (ev.type === "client" || ev.type === "client_msg") {
                        const ts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                        setMessages(m => [...m, { sender: ev.type === "client_msg" ? "Manager" : "Alexandre Renaud — CTO Nexion", text: ev.msg, time: ts, urgent: true }]);
                        setPanelTab("messages");
                        shock(1200);
                    }
                    if (ev.type === "incident") {
                        setIncident(true);
                        addLog("fatal", ev.msg);
                        shock(1500);
                    }
                    if (ev.type === "bug") {
                        setBugInjected(true);
                        setCode(BUGGY_CODE);
                        addLog("fatal", "⚠ VULNERABILITY DETECTED — System compromised");
                        addLog("fatal", "⚠ Unauthenticated access allowed — CRITICAL");
                        setPanelTab("terminal");
                        shock(2000);
                    }
                }
                if (next <= 60 && next > 0) setPhase("critical");
                else if (next <= 120) setPhase("warning");
                return next;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [submitted, isSimulationMode, simulationEvents]);

    useEffect(() => {
        consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [console_]);

    const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

    const handleRun = async () => {
        setCompiling(true);
        addLog("info", "Compiling SecureVault.sol...");
        await new Promise(r => setTimeout(r, 1400));
        if (bugInjected && code === BUGGY_CODE) {
            addLog("fatal", "CompileError: Reentrancy guard missing on withdraw()");
            addLog("warn", "Slither: 3 HIGH severity issues found");
        } else {
            addLog("success", "Compiled: 0 errors, 1 warning");
            addLog("info", "Gas estimate: 248,921 — Deploy cost: ~0.14 ETH");
        }
        setCompiling(false);
    };

    const handleSubmit = () => {
        if (submitted) return;
        clearInterval(timerRef.current);
        setSubmitted(true);
        setPhase("submitted");
        const s = (bugInjected && code === BUGGY_CODE) ? 42 : 87;
        setTimeout(() => setScore(s), 800);
    };

    const triggerManualChaos = () => {
        shock(2000);
        setBugInjected(true);
        setIncident(true);
        setCode(BUGGY_CODE);
        addLog("fatal", "⚠ MANUAL CHAOS INJECTION DETECTED");
        const ts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setMessages(m => [...m, { sender: "SYSTEM DEMO", text: "Production incident forced by presenter.", time: ts, urgent: true }]);
        setPanelTab("problems");
        setPhase("critical");
    };

    const timeRatio = time / TOTAL;
    const timerColor = phase === "critical" ? "#ff2244" : phase === "warning" ? "#ffaa00" : "#00d4ff";

    const bg = screenShock
        ? "rgba(255,20,50,0.07)"
        : "#080d18";

    const borderColor = phase === "critical" ? "#ff2244"
        : phase === "warning" ? "#ffaa00"
            : incident ? "#ff6600"
                : "#0a1428";

    return (
        <div className="z-[200]" style={{
            position: "fixed", inset: 0, background: bg,
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            color: "#c8d8f0",
            display: "flex", flexDirection: "column",
            transition: "background 0.3s",
            boxShadow: screenShock ? "inset 0 0 80px rgba(255,30,60,0.25)" : "none",
            border: `1.5px solid ${borderColor}`,
            overflow: "hidden",
        }}>
            <ScanlineOverlay />

            {/* Ambient grid background */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
                backgroundImage: `
          linear-gradient(rgba(0,180,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,180,255,0.025) 1px, transparent 1px)
        `,
                backgroundSize: "32px 32px",
            }} />

            {/* ─── TOP BAR ─────────────────────────────────────────── */}
            <header style={{
                height: 44, background: "#060c18",
                borderBottom: `1px solid ${phase === "critical" ? "rgba(255,34,68,0.5)" : "rgba(0,180,255,0.12)"}`,
                display: "flex", alignItems: "center", padding: "0 16px",
                gap: 24, zIndex: 100, position: "relative",
                transition: "border-color 0.4s",
            }}>
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                        width: 28, height: 28, borderRadius: 6,
                        background: "linear-gradient(135deg, #0066ff, #00d4ff)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 0 16px rgba(0,150,255,0.5)",
                        fontSize: 13, fontWeight: 900, color: "#fff",
                    }}>N</div>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", color: "#4488cc", textTransform: "uppercase" }}>
                        NeuralIDE
                    </span>
                    <span style={{ fontSize: 9, background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.25)", borderRadius: 3, padding: "1px 6px", color: "#00ccff", letterSpacing: "0.15em" }}>
                        {exerciseType.toUpperCase()}
                    </span>
                </div>

                {/* Optional Chaos Button */}
                <button
                    onClick={triggerManualChaos}
                    style={{
                        display: "flex", alignItems: "center", gap: 6,
                        background: "rgba(255,50,0,0.15)", border: "1px solid rgba(255,50,0,0.4)",
                        borderRadius: 4, padding: "3px 10px", color: "#ff4422",
                        fontSize: 9, fontWeight: 800, cursor: "pointer",
                        marginLeft: 12
                    }}
                    className="hover:bg-red-500/20 transition-colors"
                >
                    <Zap size={10} /> FORCE INCIDENT (DEMO)
                </button>

                {/* Simulate Fail Button */}
                {onTestRemediation && (
                    <button
                        onClick={onTestRemediation}
                        style={{
                            display: "flex", alignItems: "center", gap: 6,
                            background: "rgba(255,150,0,0.15)", border: "1px solid rgba(255,150,0,0.4)",
                            borderRadius: 4, padding: "3px 10px", color: "#ffaa00",
                            fontSize: 9, fontWeight: 800, cursor: "pointer",
                        }}
                        className="hover:bg-orange-500/20 transition-colors"
                    >
                        SIMULER ÉCHEC
                    </button>
                )}

                {/* Menu ghost */}
                {["File", "Edit", "View", "Run", "Terminal", "Help"].map(m => (
                    <span key={m} style={{ fontSize: 11, color: "#3a5070", cursor: "pointer", letterSpacing: "0.04em" }}
                        className="hover:text-blue-300 transition-colors">{m}</span>
                ))}

                <div style={{ flex: 1 }} />

                {/* Phase indicator */}
                {(incident || bugInjected) && (
                    <div style={{
                        display: "flex", alignItems: "center", gap: 6,
                        background: "rgba(255,30,60,0.12)", border: "1px solid rgba(255,30,60,0.35)",
                        borderRadius: 4, padding: "3px 10px",
                        animation: "pulse 1s infinite",
                    }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff2244", boxShadow: "0 0 8px #ff2244" }} />
                        <span style={{ fontSize: 9, fontWeight: 800, color: "#ff4466", letterSpacing: "0.2em" }}>
                            <GlitchText text="INCIDENT PROD" active={screenShock} />
                        </span>
                    </div>
                )}

                {/* Timer */}
                <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: `rgba(${phase === "critical" ? "255,30,60" : "0,150,255"},0.08)`,
                    border: `1px solid ${timerColor}33`,
                    borderRadius: 6, padding: "4px 14px",
                    transition: "all 0.4s",
                }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6" stroke={timerColor} strokeWidth="1.5" opacity="0.4" />
                        <path d={`M 7 7 L 7 2.5 A 4.5 4.5 0 ${timeRatio < 0.5 ? "0" : "1"} 1 ${7 + 4.5 * Math.sin(2 * Math.PI * (1 - timeRatio))
                            } ${7 - 4.5 * Math.cos(2 * Math.PI * (1 - timeRatio))} Z`}
                            fill={timerColor} opacity="0.6" />
                    </svg>
                    <span style={{
                        fontSize: 15, fontWeight: 800, color: timerColor, letterSpacing: "0.1em",
                        textShadow: `0 0 12px ${timerColor}88`,
                        animation: phase === "critical" ? "pulse 0.6s infinite" : "none",
                    }}>
                        {fmtTime(time)}
                    </span>
                </div>

                {/* Live badge */}
                {isLiveSession && (
                    <div style={{
                        display: "flex", alignItems: "center", gap: 5,
                        background: "rgba(0,230,100,0.08)", border: "1px solid rgba(0,230,100,0.2)",
                        borderRadius: 4, padding: "3px 8px",
                    }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00e664", boxShadow: "0 0 6px #00e664", animation: "pulse 2s infinite" }} />
                        <span style={{ fontSize: 9, color: "#00cc55", letterSpacing: "0.15em" }}>COACH {coachName?.toUpperCase()}</span>
                    </div>
                )}

                {/* Close Button */}
                <button
                    onClick={() => onClose ? onClose() : (onCancel && onCancel())}
                    style={{
                        width: 28, height: 28, borderRadius: 6, cursor: "pointer",
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#8899aa", marginLeft: 8
                    }}
                    className="hover:bg-white/10 hover:text-white transition-all"
                >
                    <X size={14} />
                </button>
            </header>

            {/* ─── BODY ─────────────────────────────────────────────── */}
            <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative", zIndex: 1 }}>

                {/* Activity Bar */}
                <div style={{
                    width: 44, background: "#050a14",
                    borderRight: "1px solid rgba(0,150,255,0.08)",
                    display: "flex", flexDirection: "column", alignItems: "center",
                    padding: "12px 0", gap: 20,
                }}>
                    {[
                        { icon: "⊟", label: "Explorer", active: true },
                        { icon: "⊗", label: "Search" },
                        { icon: "⊕", label: "Extensions" },
                        { icon: "⊘", label: "Git" },
                    ].map(({ icon, active }) => (
                        <button key={icon} style={{
                            width: 32, height: 32, borderRadius: 6,
                            background: active ? "rgba(0,180,255,0.12)" : "transparent",
                            border: active ? "1px solid rgba(0,180,255,0.2)" : "1px solid transparent",
                            color: active ? "#00ccff" : "#2a3a54",
                            fontSize: 16, cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s",
                        }}>{icon}</button>
                    ))}
                    <div style={{ flex: 1 }} />
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#1a3a6a,#0a1a34)", border: "1.5px solid rgba(0,150,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#5580aa" }}>
                        AP
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{
                    width: 220, background: "#060c18",
                    borderRight: "1px solid rgba(0,150,255,0.08)",
                    display: "flex", flexDirection: "column",
                    flexShrink: 0,
                }}>
                    <div style={{ padding: "10px 12px 6px", fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", color: "#2a4060", borderBottom: "1px solid rgba(0,150,255,0.06)" }}>
                        EXPLORER
                    </div>
                    <div style={{ padding: "6px 0", fontSize: 10, letterSpacing: "0.12em", color: "#1e3050", paddingLeft: 8, marginBottom: 4 }}>
                        ▾ SECURE_VAULT_EVAL
                    </div>
                    <div style={{ flex: 1, overflowY: "auto" }}>
                        {FILE_TREE.map((node, i) => <FileNode key={i} node={node} />)}
                    </div>

                    {/* Instructions Panel */}
                    <div style={{
                        borderTop: "1px solid rgba(0,150,255,0.08)",
                        background: "#040a14",
                    }}>
                        <div style={{ padding: "8px 12px 6px", fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", color: "#2a4060", borderBottom: "1px solid rgba(0,150,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>{title.toUpperCase()}</span>
                            <span style={{ color: "#00ccff", fontSize: 9 }}>RESUME</span>
                        </div>
                        <div style={{ padding: "10px 12px", maxHeight: 200, overflowY: "auto" }}>
                            <p style={{ fontSize: 10.5, color: "#4a90d9", marginBottom: 10, fontStyle: "italic", lineHeight: 1.6 }}>
                                {description}
                            </p>
                            {instructions.map((inst, i) => (
                                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
                                    <div style={{
                                        width: 16, height: 16, borderRadius: 4, flexShrink: 0, marginTop: 1,
                                        background: "rgba(0,180,255,0.06)",
                                        border: "1px solid rgba(0,180,255,0.2)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 8, color: "#0088cc", fontWeight: 800,
                                    }}>{i + 1}</div>
                                    <span style={{ fontSize: 10.5, color: "#4a6888", lineHeight: 1.5 }}>{inst}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── MAIN EDITOR ──────────────────────────────────────── */}
                <main style={{ flex: 1, display: "flex", flexDirection: "column", background: "#080d18", minWidth: 0, position: "relative" }}>

                    {/* Incident Banner */}
                    {(incident || bugInjected) && (
                        <div style={{
                            background: "linear-gradient(90deg, rgba(255,20,50,0.18), rgba(255,60,0,0.12))",
                            borderBottom: "1px solid rgba(255,30,60,0.4)",
                            padding: "6px 16px",
                            display: "flex", alignItems: "center", gap: 10,
                            animation: "slideDown 0.3s ease",
                        }}>
                            <span style={{ fontSize: 14 }}>⚠</span>
                            <span style={{ fontSize: 10.5, color: "#ff4466", fontWeight: 700, letterSpacing: "0.08em" }}>
                                {bugInjected
                                    ? "REENTRANCY VULNERABILITY DÉTECTÉE — emergencyDrain() EXPOSÉE — Corriger immédiatement"
                                    : "PROD INCIDENT ACTIF — Memory leak sur node-3 — Coûts gas +340%"}
                            </span>
                            <div style={{ flex: 1 }} />
                            <span style={{ fontSize: 9, color: "#ff2244", background: "rgba(255,34,68,0.15)", border: "1px solid rgba(255,34,68,0.3)", borderRadius: 3, padding: "2px 8px", letterSpacing: "0.15em" }}>CRITICAL</span>
                        </div>
                    )}

                    {/* Editor Tabs */}
                    <div style={{
                        height: 38, background: "#060c18",
                        borderBottom: "1px solid rgba(0,150,255,0.08)",
                        display: "flex", alignItems: "flex-end",
                    }}>
                        <div style={{
                            height: 36, padding: "0 16px",
                            background: "#080d18",
                            borderTop: "1.5px solid #00aaff",
                            borderRight: "1px solid rgba(0,150,255,0.08)",
                            display: "flex", alignItems: "center", gap: 8,
                            cursor: "pointer",
                        }}>
                            <span style={{ fontSize: 10, color: "#0088cc" }}>◈</span>
                            <span style={{ fontSize: 11.5, color: "#88bbdd", fontWeight: 500 }}>SecureVault.sol</span>
                            {bugInjected && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff2244", boxShadow: "0 0 8px #ff2244" }} />}
                        </div>
                        <div style={{ flex: 1, borderBottom: "1px solid rgba(0,150,255,0.08)" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 12px", borderBottom: "1px solid rgba(0,150,255,0.08)" }}>
                            <button
                                onClick={handleRun}
                                disabled={compiling}
                                style={{
                                    display: "flex", alignItems: "center", gap: 6,
                                    padding: "4px 14px", borderRadius: 5,
                                    background: compiling ? "rgba(0,100,200,0.15)" : "rgba(0,120,255,0.15)",
                                    border: "1px solid rgba(0,150,255,0.35)",
                                    color: "#00aaff", fontSize: 10, fontWeight: 700,
                                    letterSpacing: "0.12em", cursor: "pointer",
                                    transition: "all 0.2s",
                                }}>
                                {compiling ? "◌ COMPILING..." : "▶ RUN"}
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={submitted}
                                style={{
                                    display: "flex", alignItems: "center", gap: 6,
                                    padding: "4px 16px", borderRadius: 5,
                                    background: submitted ? "rgba(0,200,100,0.1)" : "rgba(0,200,100,0.12)",
                                    border: `1px solid ${submitted ? "rgba(0,200,100,0.25)" : "rgba(0,200,100,0.4)"}`,
                                    color: submitted ? "#00aa44" : "#00dd66",
                                    fontSize: 10, fontWeight: 800,
                                    letterSpacing: "0.15em", cursor: submitted ? "default" : "pointer",
                                    transition: "all 0.2s",
                                }}>
                                {submitted ? "✓ SUBMITTED" : "⇪ SUBMIT"}
                            </button>
                        </div>
                    </div>

                    {/* Code + Score overlay */}
                    <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>

                        {/* Line numbers */}
                        <div style={{
                            width: 52, background: "#060c18", paddingTop: 16,
                            textAlign: "right", paddingRight: 12, paddingLeft: 8,
                            fontSize: 11.5, color: "#1e3050", fontFamily: "monospace",
                            lineHeight: "22px", userSelect: "none", overflowY: "hidden",
                            borderRight: "1px solid rgba(0,150,255,0.06)",
                        }}>
                            {code.split("\\n").map((_, i) => (
                                <div key={i} style={{ lineHeight: "22px" }}>{i + 1}</div>
                            ))}
                        </div>

                        {/* Textarea */}
                        <textarea
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            style={{
                                flex: 1, background: "transparent",
                                padding: "16px 16px 16px 12px",
                                fontSize: 12.5, lineHeight: "22px",
                                color: bugInjected && screenShock ? "#ff8899" : "#a8c4e0",
                                fontFamily: "'JetBrains Mono', monospace",
                                resize: "none", outline: "none", border: "none",
                                caretColor: "#00d4ff",
                                overflowY: "auto",
                                transition: "color 0.3s",
                            }}
                            spellCheck={false}
                        />

                        {/* Score overlay */}
                        {score !== null && (
                            <div style={{
                                position: "absolute", inset: 0,
                                background: "rgba(4,10,20,0.92)",
                                backdropFilter: "blur(8px)",
                                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                                zIndex: 50, gap: 20,
                                animation: "fadeIn 0.6s ease",
                            }}>
                                <div style={{ fontSize: 11, letterSpacing: "0.4em", color: "#2a5080", textTransform: "uppercase" }}>Évaluation Complète</div>
                                <div style={{
                                    fontSize: 96, fontWeight: 900, lineHeight: 1,
                                    color: score >= 70 ? "#00dd88" : score >= 50 ? "#ffaa00" : "#ff3355",
                                    textShadow: `0 0 40px ${score >= 70 ? "#00dd88" : score >= 50 ? "#ffaa00" : "#ff3355"}66`,
                                    fontFamily: "monospace",
                                }}>
                                    {score}<span style={{ fontSize: 40 }}>%</span>
                                </div>
                                <div style={{ display: "flex", gap: 12, flexDirection: "column", alignItems: "center" }}>
                                    <div style={{ fontSize: 13, color: score >= 70 ? "#00aa55" : "#cc3344", letterSpacing: "0.1em" }}>
                                        {score >= 70 ? "✓ Vulnérabilité corrigée avec succès" : "✗ Reentrancy non corrigée — Contrat compromis"}
                                    </div>
                                    {messages.length > 0 && (
                                        <div style={{ fontSize: 11, color: "#3a6080" }}>
                                            {messages.length} message(s) client non traité(s) — −5pts
                                        </div>
                                    )}
                                </div>
                                <div style={{
                                    display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 10,
                                }}>
                                    {[
                                        { label: "Sécurité", val: score >= 70 ? "A+" : "F", color: score >= 70 ? "#00dd88" : "#ff3355" },
                                        { label: "Rapidité", val: time > 120 ? "B" : time > 60 ? "C" : "D", color: "#00aaff" },
                                        { label: "Pression", val: messages.length === 0 ? "A" : "B", color: "#ffaa00" },
                                    ].map(({ label, val, color }) => (
                                        <div key={label} style={{
                                            background: "rgba(0,150,255,0.05)", border: "1px solid rgba(0,150,255,0.12)",
                                            borderRadius: 8, padding: "12px 20px", textAlign: "center",
                                        }}>
                                            <div style={{ fontSize: 9, color: "#3a6080", letterSpacing: "0.2em", marginBottom: 6 }}>{label.toUpperCase()}</div>
                                            <div style={{ fontSize: 28, fontWeight: 900, color, fontFamily: "monospace" }}>{val}</div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => onSubmit(code, score || 0)}
                                    style={{
                                        marginTop: 20,
                                        padding: "12px 32px",
                                        background: "linear-gradient(90deg, #0088ff, #00bbff)",
                                        color: "#fff",
                                        fontWeight: 800,
                                        letterSpacing: "0.15em",
                                        borderRadius: 6,
                                        border: "none",
                                        cursor: "pointer",
                                        boxShadow: "0 0 20px rgba(0,150,255,0.4)"
                                    }}
                                    className="hover:scale-105 transition-transform"
                                >
                                    CONTINUER L'APPRENTISSAGE
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ─── BOTTOM PANEL ───────────────────────────────────── */}
                    <div style={{
                        height: 220, background: "#060c18",
                        borderTop: `1px solid ${bugInjected ? "rgba(255,34,68,0.3)" : "rgba(0,150,255,0.1)"}`,
                        display: "flex", flexDirection: "column",
                        transition: "border-color 0.4s",
                    }}>
                        {/* Panel Tabs */}
                        <div style={{
                            height: 36, display: "flex", alignItems: "center",
                            padding: "0 8px", gap: 2,
                            borderBottom: "1px solid rgba(0,150,255,0.07)",
                            background: "#050a14",
                        }}>
                            {[
                                { id: "terminal", label: "TERMINAL" },
                                { id: "problems", label: "PROBLEMS", badge: bugInjected ? 2 : 0, badgeColor: "#ff2244" },
                                { id: "messages", label: "MESSAGES CLIENT", badge: messages.length, badgeColor: "#ffaa00" },
                            ].map(({ id, label, badge, badgeColor }) => (
                                <button key={id} onClick={() => setPanelTab(id)} style={{
                                    height: 28, padding: "0 12px", borderRadius: 4,
                                    background: panelTab === id ? "rgba(0,150,255,0.1)" : "transparent",
                                    border: panelTab === id ? "1px solid rgba(0,150,255,0.2)" : "1px solid transparent",
                                    color: panelTab === id ? "#00aaff" : "#2a4060",
                                    fontSize: 9.5, fontWeight: 800, letterSpacing: "0.15em", cursor: "pointer",
                                    display: "flex", alignItems: "center", gap: 7,
                                    transition: "all 0.2s",
                                }}>
                                    {label}
                                    {badge > 0 && (
                                        <span style={{
                                            background: badgeColor, color: "#000",
                                            borderRadius: 10, padding: "1px 5px",
                                            fontSize: 8, fontWeight: 900,
                                            animation: "pulse 1.5s infinite",
                                        }}>{badge}</span>
                                    )}
                                </button>
                            ))}
                            <div style={{ flex: 1 }} />
                            <span style={{ fontSize: 9, color: "#1a3050" }}>node-1 • 127.0.0.1:8545</span>
                        </div>

                        {/* Panel Content */}
                        <div style={{ flex: 1, overflow: "auto", padding: "8px 0" }}>

                            {panelTab === "terminal" && (
                                <div style={{ fontFamily: "monospace", fontSize: 11.5 }}>
                                    {console_.map((line, i) => (
                                        <div key={i} style={{
                                            padding: "1px 16px",
                                            color: line.type === "fatal" ? "#ff4466"
                                                : line.type === "success" ? "#00cc66"
                                                    : line.type === "warn" ? "#ffaa00"
                                                        : line.type === "info" ? "#5588bb"
                                                            : line.type === "system" ? "#2a5070"
                                                                : "#7799aa",
                                            background: line.type === "fatal" ? "rgba(255,30,60,0.07)" : "transparent",
                                            lineHeight: "20px",
                                        }}>
                                            <span style={{ color: "#1a4060", marginRight: 8, userSelect: "none" }}>
                                                {line.type === "prompt" ? "›" : line.type === "fatal" ? "✗" : line.type === "success" ? "✓" : "·"}
                                            </span>
                                            {line.type === "prompt"
                                                ? <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                    <span style={{ color: "#00aaff" }}>visitor</span>
                                                    <span style={{ color: "#1a3a5a" }}>@</span>
                                                    <span style={{ color: "#0066aa" }}>neural-ide</span>
                                                    <span style={{ color: "#1a3a5a" }}>:~$</span>
                                                    <span style={{ display: "inline-block", width: 7, height: 14, background: "#00aaff", animation: "pulse 1s infinite", marginLeft: 4 }} />
                                                </span>
                                                : line.text
                                            }
                                        </div>
                                    ))}
                                    <div ref={consoleEndRef} />
                                </div>
                            )}

                            {panelTab === "problems" && (
                                <div style={{ padding: "8px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                                    {bugInjected ? (
                                        <>
                                            {[
                                                { sev: "HIGH", code: "SWC-107", msg: "Reentrancy: balance not decremented before external call in withdraw()", line: 21 },
                                                { sev: "CRITICAL", code: "SWC-105", msg: "emergencyDrain() — No access control. Anyone can drain the contract", line: 27 },
                                            ].map((p, i) => (
                                                <div key={i} style={{
                                                    display: "flex", gap: 12, padding: "10px 14px", borderRadius: 6,
                                                    background: "rgba(255,20,50,0.06)", border: "1px solid rgba(255,20,50,0.2)",
                                                }}>
                                                    <span style={{
                                                        fontSize: 8, fontWeight: 900, letterSpacing: "0.1em",
                                                        background: p.sev === "CRITICAL" ? "#ff2244" : "#ff6600",
                                                        color: "#fff", borderRadius: 3, padding: "2px 6px",
                                                        alignSelf: "flex-start", marginTop: 1, flexShrink: 0,
                                                    }}>{p.sev}</span>
                                                    <div>
                                                        <div style={{ fontSize: 11, color: "#ff6677", fontWeight: 600, marginBottom: 3 }}>[{p.code}] line {p.line}</div>
                                                        <div style={{ fontSize: 10.5, color: "#8899aa", lineHeight: 1.5 }}>{p.msg}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div style={{ textAlign: "center", color: "#2a4060", fontSize: 11, paddingTop: 40 }}>
                                            ✓ No issues detected
                                        </div>
                                    )}
                                </div>
                            )}

                            {panelTab === "messages" && (
                                <div style={{ padding: "8px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                                    {messages.length === 0 ? (
                                        <div style={{ textAlign: "center", color: "#1a3050", fontSize: 11, paddingTop: 40 }}>
                                            Aucun message. Restez concentré.
                                        </div>
                                    ) : messages.map((msg, i) => (
                                        <div key={i} style={{
                                            display: "flex", gap: 12, padding: "12px 14px", borderRadius: 8,
                                            background: "rgba(255,150,0,0.06)", border: "1px solid rgba(255,150,0,0.2)",
                                            animation: "slideDown 0.3s ease",
                                        }}>
                                            <div style={{
                                                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                                                background: "linear-gradient(135deg, #cc5500, #ff8800)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: 12, fontWeight: 900, color: "#fff",
                                                boxShadow: "0 0 12px rgba(255,120,0,0.4)",
                                            }}>A</div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                                    <span style={{ fontSize: 10, fontWeight: 800, color: "#ffaa00", letterSpacing: "0.05em" }}>
                                                        {msg.sender}
                                                    </span>
                                                    <span style={{ fontSize: 9, color: "#2a4060" }}>{msg.time}</span>
                                                </div>
                                                <p style={{ fontSize: 11, color: "#7a9ab8", lineHeight: 1.6, margin: 0 }}>{msg.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Right Metrics Panel */}
                <div style={{
                    width: 200, background: "#060c18",
                    borderLeft: "1px solid rgba(0,150,255,0.08)",
                    display: "flex", flexDirection: "column", padding: "12px 0",
                    gap: 0, flexShrink: 0,
                }}>
                    <div style={{ padding: "0 14px 10px", fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", color: "#1a3050" }}>METRICS</div>

                    {[
                        { label: "CPU", value: screenShock ? 98 : 14, unit: "%", danger: screenShock },
                        { label: "RAM", value: screenShock ? "15.8" : "2.4", unit: "GB", danger: screenShock },
                        { label: "GAS EST.", value: "248k", unit: "", danger: false },
                        { label: "NETWORK", value: "12", unit: "ms", danger: false },
                    ].map(({ label, value, unit, danger }) => (
                        <div key={label} style={{ padding: "8px 14px", borderBottom: "1px solid rgba(0,150,255,0.04)" }}>
                            <div style={{ fontSize: 8.5, color: "#1a3050", letterSpacing: "0.15em", marginBottom: 4 }}>{label}</div>
                            <div style={{ fontSize: 16, fontWeight: 800, color: danger ? "#ff4466" : "#3399cc", fontFamily: "monospace", letterSpacing: "0.05em" }}>
                                {value}<span style={{ fontSize: 10, color: danger ? "#cc2244" : "#1a5070" }}>{unit}</span>
                            </div>
                            <div style={{ height: 3, background: "rgba(0,100,200,0.1)", borderRadius: 2, marginTop: 5 }}>
                                <div style={{
                                    height: "100%", borderRadius: 2,
                                    background: danger ? "#ff2244" : "linear-gradient(90deg, #0055cc, #00aaff)",
                                    width: `${typeof value === "number" ? value : 40}%`,
                                    boxShadow: danger ? "0 0 6px #ff2244" : "0 0 4px #00aaff44",
                                    transition: "width 1s, background 0.3s",
                                }} />
                            </div>
                        </div>
                    ))}

                    <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(0,150,255,0.04)" }}>
                        <div style={{ fontSize: 8.5, color: "#1a3050", letterSpacing: "0.15em", marginBottom: 8 }}>SIMULATION</div>
                        {[
                            { label: "Client pressure", active: messages.length > 0 },
                            { label: "Prod incident", active: incident },
                            { label: "Bug injection", active: bugInjected },
                            { label: "Time stress", active: phase === "critical" || phase === "warning" },
                        ].map(({ label, active }) => (
                            <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                                <div style={{
                                    width: 6, height: 6, borderRadius: "50%",
                                    background: active ? "#ff4466" : "#1a3050",
                                    boxShadow: active ? "0 0 6px #ff4466" : "none",
                                    transition: "all 0.4s",
                                }} />
                                <span style={{ fontSize: 9.5, color: active ? "#cc3355" : "#1e3a5a", letterSpacing: "0.06em" }}>{label}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: "12px 14px" }}>
                        <div style={{ fontSize: 8.5, color: "#1a3050", letterSpacing: "0.15em", marginBottom: 8 }}>PROGRESS</div>
                        <div style={{ position: "relative", width: "100%" }}>
                            <svg viewBox="0 0 100 100" style={{ width: "100%", transform: "rotate(-90deg)" }}>
                                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,100,200,0.1)" strokeWidth="8" />
                                <circle cx="50" cy="50" r="40" fill="none"
                                    stroke={phase === "critical" ? "#ff2244" : "#00aaff"}
                                    strokeWidth="8"
                                    strokeDasharray={`${2 * Math.PI * 40 * timeRatio} ${2 * Math.PI * 40}`}
                                    strokeLinecap="round"
                                    style={{ filter: `drop-shadow(0 0 4px ${phase === "critical" ? "#ff2244" : "#00aaff"})`, transition: "stroke 0.4s" }}
                                />
                            </svg>
                            <div style={{
                                position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                                alignItems: "center", justifyContent: "center",
                            }}>
                                <span style={{ fontSize: 18, fontWeight: 900, color: timerColor, fontFamily: "monospace" }}>{Math.round(timeRatio * 100)}%</span>
                                <span style={{ fontSize: 8, color: "#1a3050" }}>TIME LEFT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── STATUS BAR ─────────────────────────────────────────── */}
            <footer style={{
                height: 24, background: phase === "critical" ? "#3a0010" : "#050a14",
                borderTop: `1px solid ${phase === "critical" ? "rgba(255,34,68,0.4)" : "rgba(0,150,255,0.1)"}`,
                display: "flex", alignItems: "center", padding: "0 12px",
                fontSize: 9.5, color: "#2a4060",
                gap: 16, userSelect: "none",
                transition: "all 0.4s",
            }}>
                <span style={{ color: "#0055aa" }}>⌥ main*</span>
                <span>Solidity 0.8.19</span>
                <span>UTF-8</span>
                <span>LF</span>
                <div style={{ flex: 1 }} />
                {phase === "critical" && (
                    <span style={{ color: "#ff4466", fontWeight: 800, letterSpacing: "0.15em", animation: "pulse 0.8s infinite" }}>
                        ⚠ TEMPS CRITIQUE
                    </span>
                )}
                <span style={{ color: "#1e4060" }}>Spaces: 4</span>
                <span style={{ color: "#1e4060" }}>Ln {code.split("\\n").length}, Col 1</span>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00dd66", boxShadow: "0 0 6px #00dd66" }} />
            </footer>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800;900&display=swap');
    @keyframes pulse { 0 %, 100 % { opacity: 1 } 50 % { opacity: 0.5 } }
    @keyframes slideDown { from{ transform: translateY(-6px); opacity: 0 } to{ transform: translateY(0); opacity: 1 } }
    @keyframes fadeIn { from{ opacity: 0 } to{ opacity: 1 } }
        * { box- sizing: border - box;
}
        :: -webkit - scrollbar { width: 4px; height: 4px; }
        :: -webkit - scrollbar - track { background: transparent; }
        :: -webkit - scrollbar - thumb { background: rgba(0, 150, 255, 0.15); border - radius: 2px; }
        :: -webkit - scrollbar - thumb:hover { background: rgba(0, 150, 255, 0.3); }
        textarea { scrollbar - width: thin; scrollbar - color: rgba(0, 150, 255, 0.15) transparent; }
`}</style>
        </div>
    );
}
