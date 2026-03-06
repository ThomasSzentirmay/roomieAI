import { useState, useRef, useEffect } from "react";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Space+Mono:wght@400;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

    :root {
      --black: #0a0a0a;
      --white: #f5f2ee;
      --accent: #ff4d1c;
      --accent2: #ffcc00;
      --gray: #161616;
      --gray2: #222;
      --gray3: #3a3a3a;
      --text-muted: #777;
      --safe-bottom: env(safe-area-inset-bottom, 0px);
      --safe-top: env(safe-area-inset-top, 0px);
    }

    html, body {
      background: var(--black);
      color: var(--white);
      font-family: 'DM Sans', sans-serif;
      overscroll-behavior: none;
      -webkit-font-smoothing: antialiased;
    }

    /* ── PHONE SHELL ── */
    .phone-shell {
      width: 390px;
      height: 844px;
      background: var(--black);
      border-radius: 50px;
      border: 8px solid #1a1a1a;
      box-shadow: 0 0 0 1px #333, 0 40px 80px rgba(0,0,0,0.8), inset 0 0 0 1px #0f0f0f;
      position: relative;
      overflow: hidden;
      margin: 40px auto;
    }

    /* notch */
    .phone-shell::before {
      content: '';
      position: absolute;
      top: 0; left: 50%; transform: translateX(-50%);
      width: 126px; height: 34px;
      background: #111;
      border-radius: 0 0 20px 20px;
      z-index: 9999;
    }

    .phone-screen {
      width: 100%; height: 100%;
      overflow: hidden;
      position: relative;
      border-radius: 44px;
      background: var(--black);
    }

    /* ── STATUS BAR ── */
    .status-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 28px 0;
      height: 44px;
      position: relative;
      z-index: 50;
      flex-shrink: 0;
    }

    .status-time {
      font-family: 'Space Mono', monospace;
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--white);
    }

    .status-icons {
      display: flex;
      gap: 6px;
      align-items: center;
    }

    .status-icon {
      font-size: 0.65rem;
      color: var(--white);
    }

    /* ── APP HEADER ── */
    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px 12px;
      flex-shrink: 0;
      z-index: 50;
      position: relative;
    }

    .logo {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.6rem;
      letter-spacing: 0.12em;
      color: var(--white);
      cursor: pointer;
    }

    .logo span { color: var(--accent); }

    .header-btn {
      background: var(--gray2);
      border: none;
      color: var(--text-muted);
      font-family: 'Space Mono', monospace;
      font-size: 0.55rem;
      letter-spacing: 0.1em;
      padding: 7px 12px;
      cursor: pointer;
      border-radius: 20px;
      transition: all 0.2s;
      text-transform: uppercase;
    }

    .header-btn.active { background: var(--accent); color: var(--black); font-weight: 700; }

    /* ── SCROLLABLE CONTENT ── */
    .screen-scroll {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding-bottom: 120px;
    }

    .screen-scroll::-webkit-scrollbar { display: none; }

    .full-screen {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }

    /* ── HERO ── */
    .hero {
      padding: 24px 20px 20px;
    }

    .hero-eyebrow {
      font-family: 'Space Mono', monospace;
      font-size: 0.58rem;
      color: var(--accent);
      letter-spacing: 0.2em;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    .hero-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 3.2rem;
      line-height: 0.9;
      letter-spacing: 0.02em;
      margin-bottom: 12px;
    }

    .hero-title span { color: var(--accent); }

    .hero-sub {
      font-size: 0.8rem;
      color: var(--text-muted);
      line-height: 1.6;
      font-weight: 300;
    }

    /* ── SECTION ── */
    .section { padding: 0 20px 28px; position: relative; }

    .section-label {
      font-family: 'Space Mono', monospace;
      font-size: 0.55rem;
      letter-spacing: 0.25em;
      color: var(--accent2);
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    /* ── PHOTO STRIP ── */
    .photo-strip {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      scrollbar-width: none;
      padding-bottom: 4px;
    }

    .photo-strip::-webkit-scrollbar { display: none; }

    .photo-slot {
      flex-shrink: 0;
      width: 90px;
      height: 90px;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      background: var(--gray2);
      border: 1.5px dashed var(--gray3);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 4px;
    }

    .photo-slot.filled { border-style: solid; border-color: var(--gray3); }

    .photo-slot img {
      width: 100%; height: 100%;
      object-fit: cover;
      display: block;
    }

    .photo-slot-remove {
      position: absolute;
      top: 5px; right: 5px;
      width: 20px; height: 20px;
      background: var(--accent);
      color: var(--black);
      border: none;
      border-radius: 50%;
      font-size: 0.6rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 2;
    }

    .photo-slot-add-icon { font-size: 1.4rem; color: var(--gray3); line-height: 1; }
    .photo-slot-add-text { font-family: 'Space Mono', monospace; font-size: 0.45rem; color: var(--gray3); letter-spacing: 0.05em; }

    /* ── INPUT FIELD ── */
    .input-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }

    .input-label {
      font-family: 'Space Mono', monospace;
      font-size: 0.55rem;
      letter-spacing: 0.2em;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    .styled-select, .styled-input, .styled-textarea {
      background: var(--gray2);
      border: 1px solid var(--gray3);
      color: var(--white);
      padding: 13px 14px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      outline: none;
      border-radius: 10px;
      width: 100%;
      appearance: none;
      transition: border-color 0.2s;
    }

    .styled-select:focus, .styled-input:focus, .styled-textarea:focus { border-color: var(--accent); }
    .styled-textarea { resize: none; min-height: 90px; line-height: 1.5; }

    .other-input-wrap { margin-top: 8px; animation: fadeUp 0.2s ease; }

    @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    /* ── CHIPS ── */
    .chips { display: flex; flex-wrap: wrap; gap: 7px; }

    .chip {
      padding: 7px 13px;
      border: 1px solid var(--gray3);
      background: transparent;
      color: var(--text-muted);
      font-family: 'DM Sans', sans-serif;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.15s;
      border-radius: 20px;
    }

    .chip.active { background: var(--accent); border-color: var(--accent); color: var(--black); font-weight: 600; }
    .chip.other-chip { border-style: dashed; }
    .chip.other-chip.active { background: var(--accent2); border-color: var(--accent2); border-style: solid; color: var(--black); font-weight: 600; }

    .custom-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }

    .custom-tag {
      display: flex; align-items: center; gap: 5px;
      padding: 5px 11px;
      background: var(--accent2); color: var(--black);
      font-size: 0.72rem; font-weight: 600; border-radius: 20px;
    }

    .custom-tag-remove { background: none; border: none; cursor: pointer; font-size: 0.7rem; color: var(--black); font-weight: 700; padding: 0; }

    .custom-style-row { display: flex; gap: 8px; margin-top: 8px; animation: fadeUp 0.2s ease; }
    .custom-style-row .styled-input { flex: 1; padding: 10px 14px; }

    .add-btn {
      padding: 0 16px;
      background: var(--accent); color: var(--black);
      border: none; border-radius: 10px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 0.95rem; letter-spacing: 0.08em;
      cursor: pointer; white-space: nowrap;
    }

    /* ── GENERATE BUTTON (FIXED BOTTOM) ── */
    .bottom-generate {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      padding: 16px 20px 24px;
      background: linear-gradient(to top, var(--black) 75%, transparent);
      z-index: 40;
    }

    .gen-btn {
      width: 100%;
      padding: 17px;
      background: var(--accent);
      color: var(--black);
      border: none;
      border-radius: 14px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.2rem;
      letter-spacing: 0.12em;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s;
      box-shadow: 0 4px 20px rgba(255,77,28,0.4);
    }

    .gen-btn:disabled { background: var(--gray3); color: var(--gray3); box-shadow: none; cursor: not-allowed; }
    .gen-btn:not(:disabled):active { transform: scale(0.97); }

    .gen-hint {
      text-align: center;
      margin-top: 8px;
      font-family: 'Space Mono', monospace;
      font-size: 0.55rem;
      color: var(--text-muted);
      letter-spacing: 0.08em;
    }

    /* ── BOTTOM SHEET ── */
    .sheet-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.6);
      z-index: 200;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .bottom-sheet {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      background: #1a1a1a;
      border-radius: 24px 24px 0 0;
      z-index: 201;
      padding-bottom: 32px;
      animation: slideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    }

    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }

    .sheet-handle {
      width: 36px; height: 4px;
      background: var(--gray3);
      border-radius: 2px;
      margin: 12px auto 20px;
    }

    .sheet-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.3rem;
      letter-spacing: 0.08em;
      padding: 0 20px 16px;
      border-bottom: 1px solid var(--gray2);
      color: var(--white);
    }

    .sheet-options { padding: 8px 0; }

    .sheet-option {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      padding: 16px 24px;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: background 0.15s;
    }

    .sheet-option:active { background: var(--gray2); }

    .sheet-option-icon {
      width: 44px; height: 44px;
      background: var(--gray2);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      flex-shrink: 0;
    }

    .sheet-option-text { text-align: left; }
    .sheet-option-title { font-size: 0.95rem; font-weight: 600; color: var(--white); margin-bottom: 2px; }
    .sheet-option-sub { font-size: 0.75rem; color: var(--text-muted); }

    .sheet-cancel {
      width: calc(100% - 40px);
      margin: 8px 20px 0;
      padding: 15px;
      background: var(--gray2);
      border: none;
      border-radius: 12px;
      color: var(--text-muted);
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
    }

    /* ── LOADING ── */
    .loading-screen {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 20px;
      padding: 40px 24px;
      text-align: center;
    }

    .loading-ring {
      width: 64px; height: 64px;
      border: 3px solid var(--gray2);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .loading-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2rem;
      letter-spacing: 0.1em;
    }

    .loading-sub {
      font-family: 'Space Mono', monospace;
      font-size: 0.65rem;
      color: var(--text-muted);
      letter-spacing: 0.08em;
      line-height: 1.6;
    }

    .loading-dots span {
      display: inline-block;
      width: 6px; height: 6px;
      background: var(--accent);
      border-radius: 50%;
      margin: 0 3px;
      animation: dot 1.2s ease-in-out infinite;
    }

    .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
    .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes dot { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }

    /* ── RESULTS ── */
    .results-header {
      padding: 16px 20px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }

    .results-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.6rem;
      letter-spacing: 0.05em;
    }

    .results-title span { color: var(--accent); }

    .redesign-btn {
      background: var(--gray2);
      border: none;
      color: var(--text-muted);
      font-family: 'Space Mono', monospace;
      font-size: 0.55rem;
      letter-spacing: 0.08em;
      padding: 7px 12px;
      border-radius: 20px;
      cursor: pointer;
    }

    .results-scroll {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding: 0 20px 30px;
    }

    .results-scroll::-webkit-scrollbar { display: none; }

    .result-card {
      background: var(--gray2);
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 16px;
      cursor: pointer;
      transition: transform 0.15s;
      active:transform: scale(0.98);
    }

    .result-card:active { transform: scale(0.98); }

    .result-img-wrap {
      position: relative;
      aspect-ratio: 4/3;
      overflow: hidden;
    }

    .result-img-wrap img {
      width: 100%; height: 100%;
      object-fit: cover; display: block;
    }

    .result-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%);
    }

    .result-hotspots { position: absolute; inset: 0; }

    .hotspot {
      position: absolute;
      width: 26px; height: 26px;
      background: var(--accent2);
      border: 2px solid var(--black);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Space Mono', monospace;
      font-size: 0.55rem; font-weight: 700;
      color: var(--black);
      transform: translate(-50%, -50%);
      animation: pulse 2s ease-in-out infinite;
      cursor: pointer;
      z-index: 2;
    }

    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(255,204,0,0.6); }
      50% { box-shadow: 0 0 0 6px rgba(255,204,0,0); }
    }

    .result-meta { padding: 14px 16px; }

    .result-concept {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.1rem;
      letter-spacing: 0.06em;
      margin-bottom: 4px;
    }

    .result-desc { font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 8px; }

    .result-items-count {
      font-family: 'Space Mono', monospace;
      font-size: 0.55rem;
      color: var(--accent2);
      letter-spacing: 0.1em;
    }

    /* ── DETAIL MODAL (full screen slide-up) ── */
    .detail-screen {
      position: absolute;
      inset: 0;
      background: var(--black);
      z-index: 300;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .detail-img-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16/9;
      flex-shrink: 0;
      overflow: hidden;
    }

    .detail-img-wrap img { width: 100%; height: 100%; object-fit: cover; }

    .detail-gradient {
      position: absolute; inset: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.4) 100%);
    }

    .detail-back {
      position: absolute;
      top: 12px; left: 12px;
      width: 36px; height: 36px;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(8px);
      border: none;
      border-radius: 50%;
      color: var(--white);
      font-size: 1rem;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      z-index: 10;
    }

    .detail-hotspot {
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 5;
    }

    .detail-hotspot-btn {
      width: 28px; height: 28px;
      background: var(--accent2);
      border: 2px solid var(--black);
      border-radius: 50%;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Space Mono', monospace;
      font-size: 0.58rem; font-weight: 700;
      color: var(--black);
      animation: pulse 2s ease-in-out infinite;
      border: none;
    }

    .detail-hotspot-btn.active {
      background: var(--accent);
      animation: none;
      transform: scale(1.15);
    }

    .detail-tooltip {
      position: absolute;
      bottom: 36px; left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.9);
      border: 1px solid var(--accent2);
      border-radius: 8px;
      padding: 6px 10px;
      white-space: nowrap;
      pointer-events: none;
      z-index: 10;
    }

    .detail-tooltip::after {
      content: '';
      position: absolute;
      top: 100%; left: 50%; transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: var(--accent2);
    }

    .tooltip-name { font-size: 0.68rem; font-weight: 600; color: var(--white); max-width: 140px; overflow: hidden; text-overflow: ellipsis; }
    .tooltip-price { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: var(--accent); margin-top: 1px; }

    .detail-body {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .detail-body::-webkit-scrollbar { display: none; }

    .detail-header { padding: 16px 20px 12px; border-bottom: 1px solid var(--gray2); }

    .detail-concept-name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.6rem;
      letter-spacing: 0.06em;
      margin-bottom: 4px;
    }

    .detail-atmosphere { font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; }

    .items-label {
      font-family: 'Space Mono', monospace;
      font-size: 0.55rem;
      letter-spacing: 0.2em;
      color: var(--accent2);
      text-transform: uppercase;
      padding: 14px 20px 10px;
    }

    /* ── PRODUCT CARD ── */
    .product-card {
      margin: 0 20px 10px;
      background: var(--gray2);
      border-radius: 14px;
      padding: 14px;
      border: 1.5px solid transparent;
      transition: border-color 0.2s;
      cursor: pointer;
    }

    .product-card.active { border-color: var(--accent2); background: #1a1800; }

    .product-card-top {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 10px;
    }

    .product-num-badge {
      width: 28px; height: 28px;
      background: var(--accent2);
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1rem;
      color: var(--black);
      flex-shrink: 0;
    }

    .product-card-info { flex: 1; min-width: 0; }

    .product-card-name {
      font-weight: 600;
      font-size: 0.85rem;
      line-height: 1.3;
      margin-bottom: 2px;
      color: var(--white);
    }

    .product-card-meta {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-wrap: wrap;
    }

    .product-category-tag {
      font-family: 'Space Mono', monospace;
      font-size: 0.5rem;
      color: var(--accent2);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .new-badge {
      font-family: 'Space Mono', monospace;
      font-size: 0.48rem;
      background: var(--accent);
      color: var(--black);
      padding: 2px 5px;
      border-radius: 3px;
      font-weight: 700;
    }

    .upgrade-badge {
      font-family: 'Space Mono', monospace;
      font-size: 0.48rem;
      background: var(--gray3);
      color: var(--white);
      padding: 2px 5px;
      border-radius: 3px;
    }

    .secondhand-badge {
      font-family: 'Space Mono', monospace;
      font-size: 0.48rem;
      color: #6be86b;
      background: #0a1a0a;
      border: 1px solid #2a4a2a;
      padding: 2px 5px;
      border-radius: 3px;
    }

    .product-card-price {
      font-family: 'Space Mono', monospace;
      font-size: 0.75rem;
      color: var(--accent);
      font-weight: 700;
      margin-left: auto;
    }

    .product-detail-text {
      font-size: 0.75rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 10px;
    }

    /* ── SHOP BUTTONS ── */
    .shop-btns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }

    .shop-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 9px 8px;
      border-radius: 9px;
      font-family: 'Space Mono', monospace;
      font-size: 0.58rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-decoration: none;
      cursor: pointer;
      border: none;
      transition: opacity 0.15s;
      white-space: nowrap;
    }

    .shop-btn:active { opacity: 0.75; }
    .shop-btn.amazon { background: #ff9900; color: #000; }
    .shop-btn.google { background: #4285f4; color: #fff; }
    .shop-btn.ebay   { background: #e53238; color: #fff; }
    .shop-btn.etsy   { background: #f1641e; color: #fff; }

    /* ── HOW IT WORKS ── */
    .hiw-scroll {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding-bottom: 40px;
    }

    .hiw-scroll::-webkit-scrollbar { display: none; }

    .hiw-hero { padding: 20px 20px 24px; border-bottom: 1px solid var(--gray2); }

    .hiw-eyebrow {
      font-family: 'Space Mono', monospace;
      font-size: 0.55rem;
      color: var(--accent);
      letter-spacing: 0.2em;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    .hiw-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2.8rem;
      line-height: 0.9;
      letter-spacing: 0.02em;
    }

    .hiw-title span { color: var(--accent); }

    .hiw-sub {
      font-size: 0.78rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-top: 12px;
    }

    .hiw-steps { padding: 8px 0; }

    .hiw-step {
      padding: 20px;
      border-bottom: 1px solid var(--gray2);
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }

    .hiw-step-left { flex-shrink: 0; }

    .hiw-step-num {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2.5rem;
      color: var(--gray3);
      line-height: 1;
    }

    .hiw-step-icon { font-size: 1.4rem; display: block; margin-top: 4px; }

    .hiw-step-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.05rem;
      letter-spacing: 0.06em;
      margin-bottom: 6px;
      color: var(--white);
    }

    .hiw-step-desc { font-size: 0.76rem; color: var(--text-muted); line-height: 1.6; }
    .hiw-accent { color: var(--accent); font-weight: 500; }

    .hiw-features { padding: 20px; }

    .hiw-feat-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.4rem;
      letter-spacing: 0.06em;
      margin-bottom: 14px;
    }

    .hiw-feat-title span { color: var(--accent2); }

    .hiw-feat-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .hiw-feat-card {
      background: var(--gray2);
      border-radius: 12px;
      padding: 14px;
    }

    .hiw-feat-icon { font-size: 1.2rem; margin-bottom: 8px; display: block; }

    .hiw-feat-name {
      font-family: 'Space Mono', monospace;
      font-size: 0.55rem;
      color: var(--accent2);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 5px;
    }

    .hiw-feat-desc { font-size: 0.72rem; color: var(--text-muted); line-height: 1.5; }

    .hiw-faq { padding: 20px; border-top: 1px solid var(--gray2); }

    .hiw-faq-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.4rem;
      letter-spacing: 0.06em;
      margin-bottom: 12px;
    }

    .faq-item { border-bottom: 1px solid var(--gray2); padding: 14px 0; cursor: pointer; }
    .faq-q { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
    .faq-q-text { font-size: 0.82rem; font-weight: 500; color: var(--white); }
    .faq-toggle { font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; color: var(--accent); transition: transform 0.2s; }
    .faq-toggle.open { transform: rotate(45deg); }
    .faq-a { font-size: 0.76rem; color: var(--text-muted); line-height: 1.6; margin-top: 10px; animation: fadeUp 0.2s ease; }

    .hiw-cta { padding: 24px 20px 32px; text-align: center; }

    .hiw-cta-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2rem;
      letter-spacing: 0.04em;
      margin-bottom: 16px;
      line-height: 0.95;
    }

    .hiw-cta-title span { color: var(--accent); }

    .start-btn {
      width: 100%;
      padding: 16px;
      background: var(--accent);
      color: var(--black);
      border: none;
      border-radius: 14px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.1rem;
      letter-spacing: 0.12em;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(255,77,28,0.4);
    }

    /* GENERATING OVERLAY */
    .img-generating-overlay {
      position: absolute; inset: 0; z-index: 3;
      background: rgba(0,0,0,0.55);
      backdrop-filter: blur(2px);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 10px;
    }
    .img-generating-overlay span {
      font-family: 'Space Mono', monospace;
      font-size: 0.6rem; color: var(--white);
      letter-spacing: 0.15em; text-transform: uppercase;
    }
    .img-generating-spinner {
      width: 28px; height: 28px;
      border: 2px solid rgba(255,255,255,0.2);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    /* ERROR */
    .error-box {
      margin: 0 20px 16px;
      background: #1a0a0a;
      border: 1px solid var(--accent);
      border-radius: 10px;
      padding: 14px;
      font-family: 'Space Mono', monospace;
      font-size: 0.65rem;
      color: #ff9999;
      line-height: 1.6;
    }

    /* hidden inputs */
    .hidden-input { display: none; }
  `}</style>
);

const ROOM_TYPES = ["Living Room","Bedroom","Bathroom","Kitchen","Home Office","Dining Room","Studio","Nursery","Garage","Outdoor Patio"];
const STYLE_CHIPS = ["Clean Up","Casual Rearrangement","Minimalist","Scandinavian","Industrial","Bohemian","Mid-Century Modern","Japandi","Art Deco","Coastal","Dark & Moody","Maximalist","Farmhouse","Futuristic"];

const FAQ_ITEMS = [
  { q: "How does the AI analyze my room?", a: "Roomie uses Claude's vision AI to scan your photos — detecting furniture, lighting, colors, and layout — then generates tailored redesign concepts." },
  { q: "Are product links real?", a: "Links go to Amazon, Google Shopping, eBay, and Etsy — real products you can buy immediately." },
  { q: "How many photos should I take?", a: "1–4 photos work best. Multiple angles give the most accurate results." },
  { q: "Can I redesign an empty room?", a: "Absolutely. Empty rooms are ideal — the AI can fully envision the space from scratch." },
  { q: "What if my style isn't listed?", a: "Tap '+ Other' and type any aesthetic — from Wabi-Sabi to Gothic Glam." },
];

function StatusBar() {
  const [time, setTime] = useState(() => {
    const n = new Date();
    return `${n.getHours()}:${String(n.getMinutes()).padStart(2,"0")}`;
  });
  useEffect(() => {
    const t = setInterval(() => {
      const n = new Date();
      setTime(`${n.getHours()}:${String(n.getMinutes()).padStart(2,"0")}`);
    }, 10000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="status-bar">
      <span className="status-time">{time}</span>
      <div className="status-icons">
        <span className="status-icon">▲</span>
        <span className="status-icon">WiFi</span>
        <span className="status-icon">▮▮▮</span>
      </div>
    </div>
  );
}

export default function Roomie() {
  const [page, setPage] = useState("input");
  const [images, setImages] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [customRoomType, setCustomRoomType] = useState("");
  const [styleChips, setStyleChips] = useState([]);
  const [showCustomStyle, setShowCustomStyle] = useState(false);
  const [customStyleInput, setCustomStyleInput] = useState("");
  const [customStyles, setCustomStyles] = useState([]);
  const [vibe, setVibe] = useState("");
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loadingStage, setLoadingStage] = useState(""); // "analyzing" | "generating"
  const [selectedCard, setSelectedCard] = useState(null);
  const [highlightedProduct, setHighlightedProduct] = useState(null);
  const [showSheet, setShowSheet] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const cameraRef = useRef();
  const libraryRef = useRef();

  const handleFiles = (files) => {
    const newImgs = Array.from(files).filter(f => f.type.startsWith("image/")).slice(0, 4);
    setImages(prev => [...prev, ...newImgs].slice(0, 4));
    setShowSheet(false);
  };

  const removeImage = (i) => setImages(prev => prev.filter((_, idx) => idx !== i));
  const toggleChip = (c) => setStyleChips(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const addCustomStyle = () => {
    const val = customStyleInput.trim();
    if (val && !customStyles.includes(val)) {
      setCustomStyles(prev => [...prev, val]);
      setCustomStyleInput("");
    }
  };

  const removeCustomStyle = (s) => setCustomStyles(prev => prev.filter(x => x !== s));

  const effectiveRoomType = roomType === "Other" ? (customRoomType || "room") : (roomType || "room");
  const allStyles = [...styleChips, ...customStyles];
  const canSubmit = images.length > 0 && (vibe.trim() || allStyles.length > 0);

  const toBase64 = (file) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(",")[1]);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

  const handleSubmit = async () => {
    setError("");
    setPage("loading");
    try {
      const imageContents = await Promise.all(
        images.map(async (img) => ({
          type: "image",
          source: { type: "base64", media_type: img.type, data: await toBase64(img) }
        }))
      );

      const isCleanUp = allStyles.includes("Clean Up");
      const isCasualRearrange = allStyles.includes("Casual Rearrangement");

      const prompt = `You are Roomie, an expert interior design AI and personal shopper. The user has uploaded ${images.length} photo(s) of their ${effectiveRoomType}.

Design preferences:
- Styles: ${allStyles.join(", ") || "not specified"}
- Vibe: "${vibe || "not specified"}"
- Budget: ${budget || "flexible"}

${isCleanUp ? "SPECIAL MODE — CLEAN UP: Focus on decluttering, organizing, and tidying. Identify every visible item that needs a storage solution, organizer, or cleaning product." : ""}
${isCasualRearrange ? "SPECIAL MODE — CASUAL REARRANGEMENT: Focus on rearranging existing furniture and adding small accent items. No major purchases — think repositioning, throw pillows, rugs, lighting tweaks, and small decorative objects." : ""}

CRITICAL TASK — MAKE EVERYTHING SHOPPABLE:
Scan the photo(s) carefully. Identify EVERY visible item — furniture, lighting, rugs, curtains, wall art, plants, cushions, storage, decor, appliances, EVERYTHING. Each item must be a shoppable hotspot.

Generate 4 DISTINCT redesign concepts. For each concept:
1. "name": Short punchy concept name
2. "description": One-sentence transformation
3. "atmosphere": One sentence on the feel after transformation
4. "items": Array of ALL shoppable items — target 6-8 items per concept, covering the key elements of the room. For EACH item:
   - "name": Specific product name (e.g. "IKEA KALLAX 4x4 Shelving White")
   - "category": Item type (e.g. "Sofa", "Floor Lamp", "Rug")
   - "detail": 1-2 sentences on what it is and why it works
   - "isNew": true if new item to add, false if upgrading something already there
   - "price": Realistic range (e.g. "$49–$89")
   - "hotspot": { "x": 5-95, "y": 5-95 } exact position in image as %. Spread across the full image, no two within 8 units.
   - "links": {
       "amazon": "https://www.amazon.com/s?k=URL-encoded-query",
       "google": "https://www.google.com/search?tbm=shop&q=URL-encoded-query",
       "ebay": "https://www.ebay.com/sch/i.html?_nkw=URL-encoded-query",
       "etsy": "https://www.etsy.com/search?q=URL-encoded-query"
     }
   - "secondhand": true if great to buy secondhand

Respond ONLY with valid JSON, no markdown, no backticks:
{"concepts":[{"name":"...","description":"...","atmosphere":"...","items":[{"name":"...","category":"...","detail":"...","isNew":true,"price":"...","hotspot":{"x":30,"y":60},"links":{"amazon":"...","google":"...","ebay":"...","etsy":"..."},"secondhand":false}]}]}`;

      const response = await fetch("http://localhost:3001/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 8000,
          messages: [{ role: "user", content: [...imageContents, { type: "text", text: prompt }] }]
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const text = data.content.map(b => b.text || "").join("");

      // Robustly extract JSON — strip markdown fences, find the outermost { }
      let clean = text.replace(/```json|```/g, "").trim();
      const firstBrace = clean.indexOf("{");
      const lastBrace = clean.lastIndexOf("}");
      if (firstBrace === -1 || lastBrace === -1) throw new Error("No JSON found in response");
      clean = clean.slice(firstBrace, lastBrace + 1);

      let parsed;
      try {
        parsed = JSON.parse(clean);
      } catch (jsonErr) {
        // If still failing, try to salvage by truncating to last complete concept
        const lastCompleteIdx = clean.lastIndexOf('{"name"');
        if (lastCompleteIdx > 0) {
          // Find the last cleanly closed concept object
          let truncated = clean.slice(0, lastCompleteIdx).trimEnd();
          // Remove trailing comma if present
          if (truncated.endsWith(",")) truncated = truncated.slice(0, -1);
          truncated += "]}";
          parsed = JSON.parse(truncated);
        } else {
          throw new Error("Could not parse AI response. Please try again.");
        }
      }

      const imageUrls = images.map(f => URL.createObjectURL(f));

      // Set concepts first with original images so UI appears fast
      const initialResults = parsed.concepts.map((c, i) => ({
        ...c,
        imageUrl: imageUrls[i % imageUrls.length],
        imageGenerating: true,
      }));
      setResults(initialResults);
      setPage("results");

      // Now generate AI images for each concept in the background
      setLoadingStage("generating");
      const firstImageBase64 = await toBase64(images[0]);
      const firstMimeType = images[0].type;

      parsed.concepts.forEach(async (concept, i) => {
        try {
          const imagePrompt = `${concept.name} interior design style: ${concept.atmosphere} ${concept.description}. Professional interior photography, realistic, high quality room photo.`;

          const imgRes = await fetch('http://localhost:3001/api/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: imagePrompt,
              imageBase64: firstImageBase64,
              mimeType: firstMimeType,
            })
          });

          if (imgRes.ok) {
            const { imageUrl } = await imgRes.json();
            setResults(prev => prev.map((r, idx) =>
              idx === i ? { ...r, imageUrl, imageGenerating: false } : r
            ));
          } else {
            // Keep original photo if generation fails
            setResults(prev => prev.map((r, idx) =>
              idx === i ? { ...r, imageGenerating: false } : r
            ));
          }
        } catch {
          setResults(prev => prev.map((r, idx) =>
            idx === i ? { ...r, imageGenerating: false } : r
          ));
        }
      });
    } catch (err) {
      setError(`Something went wrong: ${err.message}. Please try again.`);
      setPage("input");
    }
  };

  return (
    <>
      <Styles />
      {/* Hidden file inputs */}
      <input ref={cameraRef} className="hidden-input" type="file" accept="image/*" capture="environment" multiple onChange={e => handleFiles(e.target.files)} />
      <input ref={libraryRef} className="hidden-input" type="file" accept="image/*" multiple onChange={e => handleFiles(e.target.files)} />

      <div className="phone-shell">
        <div className="phone-screen">
          <StatusBar />

          {/* ── INPUT PAGE ── */}
          {page === "input" && (
            <div className="full-screen">
              <div className="app-header">
                <div className="logo">ROOMIE<span>.</span></div>
                <button className={`header-btn`} onClick={() => setPage("hiw")}>How It Works</button>
              </div>

              <div className="screen-scroll">
                <div className="hero">
                  <div className="hero-eyebrow">↳ AI INTERIOR DESIGN</div>
                  <h1 className="hero-title">REDESIGN<br/>YOUR <span>SPACE</span>.</h1>
                  <p className="hero-sub">Snap your room, pick a vibe, get instant AI redesigns with shoppable products.</p>
                </div>

                {/* 01 Photos */}
                <div className="section">
                  <div className="section-label">01 — Your Room</div>
                  <div className="photo-strip">
                    {images.map((img, i) => (
                      <div className="photo-slot filled" key={i}>
                        <img src={URL.createObjectURL(img)} alt="" />
                        <button className="photo-slot-remove" onClick={() => removeImage(i)}>✕</button>
                      </div>
                    ))}
                    {images.length < 4 && (
                      <div className="photo-slot" onClick={() => setShowSheet(true)}>
                        <span className="photo-slot-add-icon">+</span>
                        <span className="photo-slot-add-text">ADD PHOTO</span>
                      </div>
                    )}
                    {images.length === 0 && (
                      <div className="photo-slot" style={{opacity:0.4}}>
                        <span className="photo-slot-add-icon">📷</span>
                        <span className="photo-slot-add-text">ANGLE 2</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 02 Room Details */}
                <div className="section">
                  <div className="section-label">02 — Room Details</div>
                  <div className="input-group">
                    <label className="input-label">Room Type</label>
                    <select className="styled-select" value={roomType} onChange={e => setRoomType(e.target.value)}>
                      <option value="">Select room type…</option>
                      {ROOM_TYPES.map(r => <option key={r}>{r}</option>)}
                      <option value="Other">Other (type your own) →</option>
                    </select>
                    {roomType === "Other" && (
                      <div className="other-input-wrap">
                        <input className="styled-input" placeholder="e.g. Recording Studio, Yoga Room…" value={customRoomType} onChange={e => setCustomRoomType(e.target.value)} />
                      </div>
                    )}
                  </div>
                  <div className="input-group">
                    <label className="input-label">Budget</label>
                    <select className="styled-select" value={budget} onChange={e => setBudget(e.target.value)}>
                      <option value="">Any budget</option>
                      <option>Under $500</option>
                      <option>$500 – $2,000</option>
                      <option>$2,000 – $10,000</option>
                      <option>$10,000+</option>
                      <option>No limit — go wild</option>
                    </select>
                  </div>
                </div>

                {/* 03 Style */}
                <div className="section">
                  <div className="section-label">03 — Style</div>
                  <div className="chips">
                    {STYLE_CHIPS.map(c => (
                      <button key={c} className={`chip${styleChips.includes(c) ? " active" : ""}`} onClick={() => toggleChip(c)}>{c}</button>
                    ))}
                    <button className={`chip other-chip${showCustomStyle ? " active" : ""}`} onClick={() => setShowCustomStyle(v => !v)}>+ Other</button>
                  </div>
                  {customStyles.length > 0 && (
                    <div className="custom-tags">
                      {customStyles.map(s => (
                        <span className="custom-tag" key={s}>{s}<button className="custom-tag-remove" onClick={() => removeCustomStyle(s)}>✕</button></span>
                      ))}
                    </div>
                  )}
                  {showCustomStyle && (
                    <div className="custom-style-row">
                      <input className="styled-input" placeholder="e.g. Tokyo Capsule Hotel…" value={customStyleInput} onChange={e => setCustomStyleInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addCustomStyle()} />
                      <button className="add-btn" onClick={addCustomStyle}>ADD</button>
                    </div>
                  )}
                </div>

                {/* 04 Vibe */}
                <div className="section">
                  <div className="section-label">04 — Your Vibe</div>
                  <textarea className="styled-textarea" placeholder="e.g. Cozy reading nook in the corner, warm pendant lighting, feels like a Parisian apartment…" value={vibe} onChange={e => setVibe(e.target.value)} />
                </div>

                {error && <div className="error-box">⚠ {error}</div>}
              </div>

              <div className="bottom-generate">
                <button className="gen-btn" onClick={handleSubmit} disabled={!canSubmit}>
                  GENERATE MY REDESIGN ↗
                </button>
                {!canSubmit && (
                  <div className="gen-hint">
                    {images.length === 0 ? "↑ ADD A PHOTO TO BEGIN" : "↑ ADD A STYLE OR DESCRIBE YOUR VIBE"}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── LOADING PAGE ── */}
          {page === "loading" && (
            <div className="full-screen">
              <div className="loading-screen">
                <div className="loading-ring" />
                <div className="loading-title">
                  {loadingStage === "generating" ? "GENERATING IMAGES" : "ANALYSING ROOM"}
                </div>
                <div className="loading-dots">
                  <span /><span /><span />
                </div>
                <div className="loading-sub">
                  {loadingStage === "generating"
                    ? "AI is rendering your redesigned room…"
                    : "AI is scanning your room\nand crafting redesign concepts…"
                  }
                </div>
              </div>
            </div>
          )}

          {/* ── RESULTS PAGE ── */}
          {page === "results" && (
            <div className="full-screen">
              <div className="results-header">
                <div>
                  <div style={{fontFamily:'Space Mono,monospace',fontSize:'0.52rem',color:'var(--accent)',letterSpacing:'0.15em',marginBottom:3}}>YOUR REDESIGNS</div>
                  <div className="results-title">{results.length} <span>CONCEPTS</span></div>
                </div>
                <button className="redesign-btn" onClick={() => setPage("input")}>← REDO</button>
              </div>
              <div className="results-scroll">
                {results.map((r, i) => (
                  <div className="result-card" key={i} onClick={() => { setSelectedCard(r); setHighlightedProduct(null); }}>
                    <div className="result-img-wrap">
                      <img src={r.imageUrl} alt={r.name} />
                      {r.imageGenerating && (
                        <div className="img-generating-overlay">
                          <div className="img-generating-spinner" />
                          <span>Rendering…</span>
                        </div>
                      )}
                      <div className="result-overlay" />
                      <div className="result-hotspots">
                        {r.items.map((p, j) => (
                          <div key={j} className="hotspot"
                            style={{ left:`${p.hotspot?.x ?? 15+j*8}%`, top:`${p.hotspot?.y ?? 20+j*7}%` }}
                            onClick={e => { e.stopPropagation(); setSelectedCard(r); setHighlightedProduct(j); }}
                          >{j+1}</div>
                        ))}
                      </div>
                    </div>
                    <div className="result-meta">
                      <div className="result-concept">{r.name}</div>
                      <div className="result-desc">{r.description}</div>
                      <div className="result-items-count">↳ {r.items.length} SHOPPABLE ITEMS — TAP TO EXPLORE</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── HOW IT WORKS PAGE ── */}
          {page === "hiw" && (
            <div className="full-screen">
              <div className="app-header">
                <div className="logo">ROOMIE<span>.</span></div>
                <button className="header-btn active" onClick={() => setPage("input")}>← Back</button>
              </div>
              <div className="hiw-scroll">
                <div className="hiw-hero">
                  <div className="hiw-eyebrow">↳ THE ROOMIE PROCESS</div>
                  <h2 className="hiw-title">HOW<br/><span>ROOMIE</span><br/>WORKS.</h2>
                  <p className="hiw-sub">From a photo of your room to a fully shoppable redesign in under 30 seconds.</p>
                </div>

                <div className="hiw-steps">
                  {[
                    { num:"01", icon:"📸", title:"SNAP YOUR ROOM", desc:<>Take or upload <span className="hiw-accent">1–4 photos</span> of any space. Use your camera for an instant shot, or pick from your library.</> },
                    { num:"02", icon:"🎨", title:"SET YOUR VIBE", desc:<>Pick from <span className="hiw-accent">14 curated styles</span> or type your own. Mix as many as you like.</> },
                    { num:"03", icon:"🤖", title:"AI SCANS YOUR SPACE", desc:<>Claude's vision AI detects <span className="hiw-accent">every item in your room</span> and generates 4 unique redesign concepts.</> },
                    { num:"04", icon:"🛍️", title:"SHOP EVERYTHING", desc:<>Every visible item gets a <span className="hiw-accent">shoppable hotspot</span> with links to Amazon, Google, eBay and Etsy.</> },
                  ].map((s, i) => (
                    <div className="hiw-step" key={i}>
                      <div className="hiw-step-left">
                        <div className="hiw-step-num">{s.num}</div>
                        <span className="hiw-step-icon">{s.icon}</span>
                      </div>
                      <div>
                        <div className="hiw-step-title">{s.title}</div>
                        <div className="hiw-step-desc">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hiw-features">
                  <div className="hiw-feat-title">WHAT MAKES ROOMIE <span>DIFFERENT</span></div>
                  <div className="hiw-feat-grid">
                    {[
                      { icon:"🔍", name:"Vision AI", desc:"Reads your actual room, not a quiz." },
                      { icon:"📍", name:"Full Coverage", desc:"Every item in the room is shoppable." },
                      { icon:"✏️", name:"Custom Styles", desc:"Type any aesthetic you can imagine." },
                      { icon:"💰", name:"Budget-Aware", desc:"Keeps picks within your range." },
                      { icon:"⚡", name:"30 Seconds", desc:"4 full concepts, instantly." },
                      { icon:"♻️", name:"Secondhand", desc:"eBay & Etsy for vintage finds." },
                    ].map((f, i) => (
                      <div className="hiw-feat-card" key={i}>
                        <span className="hiw-feat-icon">{f.icon}</span>
                        <div className="hiw-feat-name">{f.name}</div>
                        <div className="hiw-feat-desc">{f.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hiw-faq">
                  <div className="hiw-faq-title">FAQ</div>
                  {FAQ_ITEMS.map((item, i) => (
                    <div className="faq-item" key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <div className="faq-q">
                        <div className="faq-q-text">{item.q}</div>
                        <div className={`faq-toggle${openFaq === i ? " open" : ""}`}>+</div>
                      </div>
                      {openFaq === i && <div className="faq-a">{item.a}</div>}
                    </div>
                  ))}
                </div>

                <div className="hiw-cta">
                  <div className="hiw-cta-title">READY TO<br/><span>REDESIGN?</span></div>
                  <button className="start-btn" onClick={() => setPage("input")}>START NOW ↗</button>
                </div>
              </div>
            </div>
          )}

          {/* ── DETAIL FULL SCREEN ── */}
          {selectedCard && (
            <div className="detail-screen">
              <div className="detail-img-wrap">
                <img src={selectedCard.imageUrl} alt={selectedCard.name} />
                <div className="detail-gradient" />
                <button className="detail-back" onClick={() => { setSelectedCard(null); setHighlightedProduct(null); }}>←</button>
                {selectedCard.items.map((p, j) => (
                  <div key={j} className="detail-hotspot" style={{ left:`${p.hotspot?.x ?? 15+j*8}%`, top:`${p.hotspot?.y ?? 20+j*7}%` }}>
                    <button
                      className={`detail-hotspot-btn${highlightedProduct === j ? " active" : ""}`}
                      onClick={() => setHighlightedProduct(highlightedProduct === j ? null : j)}
                    >{j+1}</button>
                    {highlightedProduct === j && (
                      <div className="detail-tooltip">
                        <div className="tooltip-name">{p.name}</div>
                        <div className="tooltip-price">{p.price}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="detail-body">
                <div className="detail-header">
                  <div className="detail-concept-name">{selectedCard.name}</div>
                  <div className="detail-atmosphere">{selectedCard.atmosphere}</div>
                </div>

                <div className="items-label">{selectedCard.items.length} ITEMS — TAP HOTSPOT OR SCROLL</div>

                {selectedCard.items.map((p, j) => (
                  <div
                    key={j}
                    className={`product-card${highlightedProduct === j ? " active" : ""}`}
                    onClick={() => setHighlightedProduct(highlightedProduct === j ? null : j)}
                  >
                    <div className="product-card-top">
                      <div className="product-num-badge">{j+1}</div>
                      <div className="product-card-info">
                        <div className="product-card-name">{p.name}</div>
                        <div className="product-card-meta">
                          <span className="product-category-tag">{p.category}</span>
                          {p.isNew ? <span className="new-badge">NEW</span> : <span className="upgrade-badge">UPGRADE</span>}
                          {p.secondhand && <span className="secondhand-badge">♻ 2nd hand</span>}
                        </div>
                      </div>
                      <div className="product-card-price">{p.price}</div>
                    </div>
                    <div className="product-detail-text">{p.detail}</div>
                    <div className="shop-btns">
                      <a className="shop-btn amazon" href={p.links?.amazon} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>📦 Amazon</a>
                      <a className="shop-btn google" href={p.links?.google} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>🛍 Google</a>
                      <a className="shop-btn ebay" href={p.links?.ebay} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>🔄 eBay</a>
                      <a className="shop-btn etsy" href={p.links?.etsy} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>🎨 Etsy</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PHOTO BOTTOM SHEET ── */}
          {showSheet && (
            <>
              <div className="sheet-backdrop" onClick={() => setShowSheet(false)} />
              <div className="bottom-sheet">
                <div className="sheet-handle" />
                <div className="sheet-title">ADD ROOM PHOTO</div>
                <div className="sheet-options">
                  <button className="sheet-option" onClick={() => { setShowSheet(false); cameraRef.current.click(); }}>
                    <div className="sheet-option-icon">📷</div>
                    <div className="sheet-option-text">
                      <div className="sheet-option-title">Take a Photo</div>
                      <div className="sheet-option-sub">Use your camera right now</div>
                    </div>
                  </button>
                  <button className="sheet-option" onClick={() => { setShowSheet(false); libraryRef.current.click(); }}>
                    <div className="sheet-option-icon">🖼️</div>
                    <div className="sheet-option-text">
                      <div className="sheet-option-title">Choose from Library</div>
                      <div className="sheet-option-sub">Pick existing photos</div>
                    </div>
                  </button>
                </div>
                <button className="sheet-cancel" onClick={() => setShowSheet(false)}>Cancel</button>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}
