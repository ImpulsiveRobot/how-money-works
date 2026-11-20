export interface VerifiedSource {
  id: number;
  shortLabel: string;
  institution: string;
  title: string;
  authorsOrDivision: string;
  year: string;
  url: string;
  keyVerifiedFacts: string[];
  chapterRefs: string[];
}

export const VERIFIED_SOURCES: VerifiedSource[] = [
  {
    id: 1,
    shortLabel: "BoE 2014",
    institution: "Bank of England",
    title: "Money Creation in the Modern Economy (Quarterly Bulletin 2014 Q1)",
    authorsOrDivision: "Michael McLeay, Amar Radia, and Ryland Thomas — Monetary Analysis Directorate",
    year: "2014",
    url: "https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy",
    keyVerifiedFacts: [
      "Roughly 97% of broad money held by the public in the UK consists of electronic commercial bank deposits; physical notes and coins make up only ~3%.",
      "Commercial banks do not simply lend out pre-existing deposits, nor do central bank reserves mechanically multiply into loans.",
      "Whenever a commercial bank makes a loan, it simultaneously creates a matching deposit in the borrower's account, creating new money; repaying loan principal destroys money.",
      "Money creation is constrained by bank profitability & risk management, borrower demand & repayment behavior, prudential capital/liquidity regulation, and central bank interest rates."
    ],
    chapterRefs: ["Overview", "Ch. 02", "Ch. 04"]
  },
  {
    id: 2,
    shortLabel: "Bundesbank 2017",
    institution: "Deutsche Bundesbank",
    title: "The Role of Banks, Non-Banks and the Central Bank in the Money Creation Process (Monthly Report, April 2017)",
    authorsOrDivision: "Deutsche Bundesbank Economics Department",
    year: "2017",
    url: "https://www.bundesbank.de/en/publications/reports/monthly-reports",
    keyVerifiedFacts: [
      "Confirms endogenous money creation: commercial banks create sight deposits ('book money') through double-entry accounting when extending credit.",
      "Banks do not need pre-existing excess reserves to originate a loan; central banks accommodate aggregate reserve demand ex-post against eligible collateral.",
      "Highlights Basel III Common Equity Tier 1 (CET1) capital ratios and the Liquidity Coverage Ratio (LCR) alongside credit demand and risk appetite as real-world guardrails."
    ],
    chapterRefs: ["Ch. 02"]
  },
  {
    id: 3,
    shortLabel: "Fed Reg D 2020",
    institution: "Board of Governors of the Federal Reserve System",
    title: "Reserve Requirements Reduction to Zero & Regulation D Amendment",
    authorsOrDivision: "Federal Reserve Board Policy Releases (March 15 & April 24, 2020)",
    year: "2020",
    url: "https://www.federalreserve.gov/monetarypolicy/reservereq.htm",
    keyVerifiedFacts: [
      "Effective March 26, 2020, the Federal Reserve reduced reserve requirement ratios to 0% for all depository institutions.",
      "In April–May 2020, the Fed amended Regulation D to delete the six-per-month convenient transfer limit on savings deposits.",
      "Because savings deposits became functionally indistinguishable from checking accounts for payments, the Federal Reserve subsequently incorporated savings deposits into the M1 monetary aggregate."
    ],
    chapterRefs: ["Ch. 02", "Ch. 03"]
  },
  {
    id: 4,
    shortLabel: "Fedwire RTGS",
    institution: "Federal Reserve Financial Services",
    title: "Fedwire Funds Service — Annual & Daily Payment Statistics",
    authorsOrDivision: "Federal Reserve Banks",
    year: "2024–2025",
    url: "https://www.frbservices.org/resources/financial-services/wires/volume-value-stats",
    keyVerifiedFacts: [
      "Fedwire is a Real-Time Gross Settlement (RTGS) system that settles each interbank payment individually and irrevocably on the books of the Federal Reserve.",
      "Processes roughly 850,000 to 920,000 transfers per business day with an average daily settled value of approximately $4.5 trillion to $4.8 trillion.",
      "While transfers over $1 million represent roughly 10% of daily message volume, they account for ~98% of total daily value settled."
    ],
    chapterRefs: ["Ch. 03"]
  },
  {
    id: 5,
    shortLabel: "Fed Floor System",
    institution: "Federal Reserve System (Board & NY Fed)",
    title: "Monetary Policy Implementation in an Ample-Reserves Regime (IORB & ON RRP)",
    authorsOrDivision: "Federal Reserve Board & Federal Reserve Bank of St. Louis / New York",
    year: "2024",
    url: "https://www.federalreserve.gov/monetarypolicy/monetary-policy-implementation.htm",
    keyVerifiedFacts: [
      "In an ample-reserves ('floor') regime, the Fed steers the federal funds rate primarily via administered rates rather than daily open market scarcity adjustments.",
      "Interest on Reserve Balances (IORB) serves as the primary reservation rate for depository banks holding reserves at the Fed.",
      "The Overnight Reverse Repurchase Agreement (ON RRP) facility gives non-bank institutions (such as money market funds) a risk-free overnight rate, establishing a firm market floor."
    ],
    chapterRefs: ["Ch. 04"]
  },
  {
    id: 6,
    shortLabel: "BoE QE Guide",
    institution: "Bank of England",
    title: "Quantitative Easing: How It Works and Its Transmission Channels",
    authorsOrDivision: "Bank of England Monetary Policy Explainers & Quarterly Bulletin",
    year: "2014–2024",
    url: "https://www.bankofengland.co.uk/monetary-policy/quantitative-easing",
    keyVerifiedFacts: [
      "QE does not print physical banknotes to hand to households or directly finance government deficits.",
      "The central bank buys long-term government bonds primarily from non-bank financial institutions (e.g., pension funds and insurers) by creating new central bank reserves credited to the seller's commercial bank, which in turn credits the seller's deposit account.",
      "Works mainly through portfolio rebalancing: lower government bond yields push institutional investors into corporate bonds and equities, easing broader borrowing costs."
    ],
    chapterRefs: ["Ch. 04"]
  },
  {
    id: 7,
    shortLabel: "BLS CPI-U",
    institution: "U.S. Bureau of Labor Statistics (BLS)",
    title: "Consumer Price Index for All Urban Consumers (CPI-U), U.S. City Average (1982–84 = 100)",
    authorsOrDivision: "U.S. Department of Labor — Bureau of Labor Statistics",
    year: "1913–2025",
    url: "https://www.bls.gov/cpi/",
    keyVerifiedFacts: [
      "Annual average CPI-U rose from 9.9 (1913) to 40.5 (1971), 172.2 (2000), 313.689 (2024), and 321.943 (2025, 11-month average due to an October 2025 federal data lapse).",
      "Purchasing power equivalence is computed via Amount × (CPI_target / CPI_start).",
      "$100 in 1913 corresponds to roughly $3,169 in 2024 purchasing power (~$3,252 in 2025); conversely, a 2025 dollar holds roughly 3.1% of the buying power of a 1913 dollar."
    ],
    chapterRefs: ["Ch. 05"]
  },
  {
    id: 8,
    shortLabel: "RBNZ / Fed 2%",
    institution: "Reserve Bank of New Zealand & Federal Reserve",
    title: "Origins of the 2% Inflation Target (Reserve Bank Act 1989 & FOMC Statement 2012)",
    authorsOrDivision: "RBNZ Historical Archives & Federal Open Market Committee",
    year: "1989 / 2012",
    url: "https://www.federalreserve.gov/monetarypolicy/review-of-monetary-policy-strategy-tools-and-communications.htm",
    keyVerifiedFacts: [
      "Formal inflation targeting originated in New Zealand under the Reserve Bank Act of 1989, initially setting a 0%–2% range as a practical buffer above zero.",
      "The U.S. Federal Reserve formally adopted an explicit 2% longer-run inflation objective in January 2012.",
      "A ~2% buffer helps prevent economies from hitting the Zero Lower Bound (ZLB) on nominal interest rates during downturns, accounts for upward CPI measurement bias, and eases real wage adjustments."
    ],
    chapterRefs: ["Ch. 05"]
  },
  {
    id: 9,
    shortLabel: "Monetary History",
    institution: "Federal Reserve History & U.S. Department of State (Office of the Historian)",
    title: "Bretton Woods Conference (1944), The Nixon Shock (August 15, 1971), and Early Ledgers",
    authorsOrDivision: "Federal Reserve History / Office of the Historian / Archaeological Consensus",
    year: "1944–1971",
    url: "https://www.federalreservehistory.org/essays/gold-convertibility-ends",
    keyVerifiedFacts: [
      "Ancient Mesopotamian cuneiform clay tablets (c. 3000 BCE) recorded credit and debt obligations long before standardized metal coinage emerged.",
      "Ancient Lydia (c. 600 BCE) introduced state-stamped electrum coins guaranteeing weight and purity; Song Dynasty China (11th century CE) issued Jiaozi, the first official state paper money.",
      "In July 1944, 44 Allied nations established Bretton Woods, pegging the USD to gold at $35/oz. On August 15, 1971, President Nixon suspended dollar-to-gold convertibility, beginning the modern pure fiat era."
    ],
    chapterRefs: ["Ch. 01"]
  },
  {
    id: 10,
    shortLabel: "US Treasury TIC",
    institution: "U.S. Department of the Treasury",
    title: "Treasury Bulletin — Ownership of Federal Securities & TIC Data",
    authorsOrDivision: "Bureau of the Fiscal Service / Office of International Affairs",
    year: "2024–2025",
    url: "https://home.treasury.gov/data/treasury-international-capital-tic-system",
    keyVerifiedFacts: [
      "Gross U.S. federal debt splits into roughly 80%–81% Debt Held by the Public and 19%–20% Intragovernmental Holdings (such as Social Security and Medicare trust funds).",
      "Domestic private entities (households, pensions, mutual funds, banks, insurers, state/local governments) hold the largest single slice at ~45%+ of gross debt.",
      "Foreign and international investors hold ~23%–24% (led by Japan, the UK, and Mainland China), while Federal Reserve Banks hold ~11%–12%."
    ],
    chapterRefs: ["Ch. 06"]
  }
];

export interface HistoricalEra {
  id: string;
  year: string;
  title: string;
  region: string;
  backing: string;
  summary: string;
  breakthrough: string;
  limitation: string;
  citationId: number;
}

export const HISTORICAL_ERAS: HistoricalEra[] = [
  {
    id: "mesopotamia",
    year: "c. 3000 BCE",
    title: "Cuneiform Clay Ledgers",
    region: "Ancient Mesopotamia",
    backing: "Temple & community credit obligations (barley / silver shekels)",
    summary:
      "Before coins ever existed, Mesopotamian scribes pressed debt records into wet clay tablets. Contrary to the popular 'barter village' myth, early money functioned primarily as a unit of account for credit and taxes.",
    breakthrough: "Separated value accounting from immediate physical trade.",
    limitation: "Hard to transfer credit claims between strangers across long distances.",
    citationId: 9
  },
  {
    id: "lydia",
    year: "c. 600 BCE",
    title: "Stamped Electrum Coins",
    region: "Kingdom of Lydia (Western Anatolia)",
    backing: "Natural gold-silver alloy stamped by state authority",
    summary:
      "Lydian rulers minted standardized lumps of electrum bearing an official lion emblem. Merchants no longer had to weigh and assay raw metal at every market stall.",
    breakthrough: "Created portable, anonymous, universally verifiable retail money.",
    limitation: "Heavy to transport in bulk and limited by mined metal supply.",
    citationId: 9
  },
  {
    id: "song",
    year: "11th Century CE",
    title: "Jiaozi Paper Currency",
    region: "Song Dynasty China (Sichuan)",
    backing: "Merchant copper-coin receipts later issued by the imperial state",
    summary:
      "Carrying heavy strings of copper coins across trade routes became impractical. Deposit shops issued paper receipts, and the Song government soon created the world's first official paper currency.",
    breakthrough: "Proved that paper symbols could circulate far faster than metal.",
    limitation: "Over-issuance during wartime triggered history's earliest episodes of paper inflation.",
    citationId: 9
  },
  {
    id: "bretton-woods",
    year: "July 1944",
    title: "Bretton Woods Gold-Dollar Peg",
    region: "New Hampshire, USA (44 Nations)",
    backing: "Foreign currencies pegged to USD; USD convertible to gold at $35/oz",
    summary:
      "Allied delegates built a post-WWII monetary order anchored by the U.S. dollar, founding the IMF and World Bank to stabilize global exchange rates and trade.",
    breakthrough: "Stabilized international trade and post-war reconstruction for nearly three decades.",
    limitation: "Triffin dilemma: supplying global liquidity required U.S. dollar outflows that eventually outstripped U.S. gold reserves.",
    citationId: 9
  },
  {
    id: "fiat",
    year: "Aug 15, 1971",
    title: "The Modern Fiat Era",
    region: "Global Floating Currencies",
    backing: "Legal tender law, tax acceptance, productive economy & central bank credibility",
    summary:
      "Facing mounting foreign gold redemptions, President Nixon suspended dollar-to-gold convertibility ('closing the gold window'). Today, every major currency is fiat money—mostly digital bank ledger entries.",
    breakthrough: "Central banks gained flexibility to respond to recessions and banking panics.",
    limitation: "Requires institutional credibility and disciplined policy to preserve purchasing power.",
    citationId: 9
  }
];

export interface CpiDataPoint {
  year: number;
  cpi: number;
  note: string;
}

// Verified U.S. Bureau of Labor Statistics (BLS) CPI-U Annual Averages (1982-84 = 100)
export const BLS_CPI_DATA: CpiDataPoint[] = [
  { year: 1913, cpi: 9.9, note: "Federal Reserve Act signed (Dec 23, 1913); BLS CPI series begins." },
  { year: 1920, cpi: 20.0, note: "Post-WWI inflation spike doubles prices relative to 1913." },
  { year: 1930, cpi: 16.7, note: "Early Great Depression deflation lowers nominal prices." },
  { year: 1940, cpi: 14.0, note: "A decade of Depression-era deflation keeps prices 30% below 1920." },
  { year: 1950, cpi: 24.1, note: "Post-WWII consumer boom and lifting of wartime price controls." },
  { year: 1960, cpi: 29.6, note: "Bretton Woods era of relatively low, steady inflation." },
  { year: 1970, cpi: 38.8, note: "Late-1960s fiscal & Vietnam War pressures begin building." },
  { year: 1971, cpi: 40.5, note: "Nixon closes the gold window (Aug 15, 1971); modern fiat era begins." },
  { year: 1980, cpi: 82.4, note: "1970s oil shocks & Great Inflation more than double prices in one decade." },
  { year: 1990, cpi: 130.7, note: "Post-Volcker disinflation era stabilizes annual price growth." },
  { year: 2000, cpi: 172.2, note: "Turn of the millennium; globalization keeps goods inflation muted." },
  { year: 2010, cpi: 218.1, note: "Aftermath of the 2008 Global Financial Crisis; low inflation despite QE." },
  { year: 2020, cpi: 258.8, note: "COVID-19 shock initially slows inflation before supply bottlenecks hit." },
  { year: 2024, cpi: 313.689, note: "Post-pandemic inflation wave subsides toward central bank targets." },
  { year: 2025, cpi: 321.943, note: "2025 annual average (11-month BLS average; Oct 2025 omitted due to funding lapse)." }
];

export interface DebtHolderSlice {
  id: string;
  label: string;
  sharePercent: number;
  rangeLabel: string;
  color: string;
  description: string;
  examples: string;
}

export const US_DEBT_HOLDERS: DebtHolderSlice[] = [
  {
    id: "domestic-private",
    label: "Domestic Private & Local Investors",
    sharePercent: 46,
    rangeLabel: "~45%–47%",
    color: "#0F6E56",
    description:
      "The largest single group of U.S. Treasury owners is Americans themselves—directly and through retirement and savings institutions.",
    examples: "Mutual funds, pension funds, households, U.S. banks, insurers, state & local governments"
  },
  {
    id: "foreign",
    label: "Foreign & International Holders",
    sharePercent: 23.5,
    rangeLabel: "~23%–24%",
    color: "#1E3A5F",
    description:
      "Foreign central banks and global investors hold Treasuries as safe liquid reserves and trade settlement assets.",
    examples: "Led by Japan (~$1.1T–$1.2T), United Kingdom (~$800B–$880B), and Mainland China (~$680B–$780B)"
  },
  {
    id: "intragov",
    label: "Intragovernmental Trust Funds",
    sharePercent: 19.5,
    rangeLabel: "~19%–20%",
    color: "#B45309",
    description:
      "Special Treasury securities held by federal trust funds where the government owes itself future benefit obligations.",
    examples: "Social Security Trust Funds, Medicare, federal civilian & military retirement funds"
  },
  {
    id: "fed",
    label: "Federal Reserve Banks",
    sharePercent: 11,
    rangeLabel: "~11%–12%",
    color: "#7C3AED",
    description:
      "Treasuries purchased on the secondary market by the Federal Reserve to supply currency, reserves, and conduct monetary policy.",
    examples: "System Open Market Account (SOMA); normalized down via QT from 2022 peaks"
  }
];
