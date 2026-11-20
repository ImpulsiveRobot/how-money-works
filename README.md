# How Money Works — An Interactive Monetary Atlas

An animated, rigorously researched web application explaining how modern money is created, settled, steered by central banks, eroded by inflation, and financed through sovereign debt.

## Interactive Chapters

1. **Origins & Evolution** — Double Coincidence of Wants barter vs. money simulator and a 5,000-year historical timeline (Mesopotamian cuneiform ledgers → Lydian electrum coins → Song Dynasty *Jiaozi* → Bretton Woods 1944 → Nixon Shock Aug 15, 1971).
2. **Commercial Bank Credit Creation** — Live double-entry T-account simulator demonstrating Bank of England (2014) and Deutsche Bundesbank (2017) findings: loans create deposits, principal repayments destroy money, and Basel III CET1 capital ratios (not fractional reserves) act as guardrails.
3. **The Two-Tier Plumbing** — Animated RTGS / Fedwire interbank payment settlement simulator and interactive M0 / M1 / M2 monetary aggregate explorer (including the May 2020 Regulation D update).
4. **Central Bank Control Deck** — Interactive policy rate slider with an ample-reserves corridor (IORB & ON RRP) plus a 3-actor Quantitative Easing (QE) / Quantitative Tightening (QT) balance-sheet animator.
5. **Inflation, Deflation & Purchasing Power** — Interactive macroeconomic spending vs. output engine (`MV = PY`), official U.S. BLS CPI-U Purchasing Power Time Machine (1913–2025), and the origins of the 2% inflation target (RBNZ 1989 → Fed 2012).
6. **Government Debt & The Bond Seesaw** — Exact present-value animated Bond Price ↔ Market Yield seesaw and interactive U.S. Treasury debt ownership breakdown.

## Running Locally

```bash
cd /Users/richardattfield/dev/how-money-works
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).
