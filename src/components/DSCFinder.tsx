import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Search } from "lucide-react";
import { dscProducts } from "../data/products";

interface SearchResult {
  type: string;
  price: number;
  relevanceScore: number;
  features: string[];
}

const dscDatabase = [
  {
    type: "Class 3 Individual Signing DSC",
    basePrice: dscProducts["Class 3 Individual Signing DSC"],
    features: ["GST", "Income Tax", "EPF", "ROC", "MCA21", "Digital Signing", "eSign", "Document Authentication"],
    keywords: ["individual", "DSC", "DigitalSign", "Signature", "IT", "GST", "EPF", "MSME", "Trademark", "KYC", "ROC", "ITR", "Tax", "Filing", "Invoice", "IEC", "NSDL", "ICEGATE", "Verify", "eSign", "Secure", "Paperless", "Authentication", "Income", "Token", "USB", "Aadhaar", "Cert", "Compliance", "PAN", "Bank", "CA", "EPFO", "Identity", "Online", "TDS", "Private", "Legal", "Professionals", "DigitalID", "eGov", "Tender", "Bid", "eBid", "NIC", "CPPP", "GEM", "MSTC", "BHEL", "IOCL", "BPCL", "ONGC", "HPCL", "PSU", "EPC", "Contract", "Vendor", "Bidder", "Auction", "Procurement", "eProc", "BidSubmission", "RFP", "RFQ", "BidDoc", "Quotation", "Proposal", "EOI", "GeM", "GEMTender", "NICPortal", "eGP", "ETender", "Tenderwizard", "NTPC", "BEML", "IOCLTender", "MSMEbid", "TendersGov", "GEMeProc", "L1", "L2", "OnlineBidding", "CPPPortal", "SECI", "IREL", "PowerGrid", "TANGEDCO", "personal", "signing", "gst", "tax", "epf", "digital signature", "esign", "authentication","eoffice"]
  },
  {
    type: "Class 3 Individual Combo DSC",
    basePrice: dscProducts["Class 3 Individual Combo DSC"],
    features: ["GST", "Income Tax", "EPF", "ROC", "MCA21", "ICEGATE", "eTender", "Digital Signing"],
    keywords: ["combo", "individual", "icegate", "tender", "bidding", "comprehensive", "all-in-one",  "Personal", "Dual", "Business", "Ecommerce", "Aadhaar", "PAN", "Import", "Export", "Startup", "Trade", "Portal",
  "CBSE", "AICTE", "File", "Access", "TDS", "Compliance", "Bank", "MOA", "eGov", "Tax", "Cert", "Digital",
  "Authenticate", "Signature", "Invoice", "Security", "G2C", "Attest", "IRCTC", "ICEGATE", "MSME", "LLP",
  "Pvt", "Statutory", "Tender", "Bidding", "Bid", "PSU", "Procurement", "eProc", "EMD", "GEM", "NIC", "CPWD",
  "RFP", "RFI", "RFQ", "Auction", "Quote", "Vendor", "L1", "L2", "GEMLogin", "ESubmit", "MSMETender", "IOCL",
  "BEML", "Rail", "NTPC", "Defense", "GEMBuyer", "EFile", "ContractSign", "Proposal", "Bids", "TenderKey",
  "NICDSC", "GEMVerify", "BidSecure", "RailTender", "InfraTender", "eToken", "CPP", "eBid", "OnlineTender",
  "DocSign", "B2B", "EContract", "MSMEBid", "TendersOnline", "GEMProc", "eQuotation", "GAIL", "NTPCBid",
  "NPCIL", "ONGCBid", "CoalIndia", "BELBid", "GST", "IncomeTax", "EPF", "TrademarkRegister", "MCA21", "ROC",
  "DirectorKYC", "InvoiceSign", "IECCode", "Traces", "ICEGATE", "MEIS", "SEIS", "CERSAI", "Bhulekh",
  "Scholarship", "AICTE", "CBSE", "LimitedGramPanchayat", "LimitedETender", "LimitedEProcure"
]
  },
  {
    type: "Class 3 Organization Signing DSC",
    basePrice: dscProducts["Class 3 Organization Signing DSC"],
    features: ["Startup Registration", "Railway Tender", "NSWS Portal", "GST", "Income Tax", "EPF", "ROC", "MCA21"],
    keywords: ["organization", "signing", "startup", "railway", "tender", "nsws", "StartupIndia", "Railways", "NSWS", "StartupRegister", "RailwayTender", "StartupPortal", "NSWSPortal", "RailTender", "StartupDSC", "OrganizationSigning", "CompanySigning", "BusinessSigning", "CorporateSigning", "StartupCert", "RailwayCert", "NSWSCert", "StartupAuth", "RailwayAuth", "NSWSAuth", "StartupCompliance", "RailwayCompliance", "NSWSCompliance", "organization", "company", "business", "corporate", "gst", "tax", "epf", "roc", "mca21", "digital signature", "signing"]
  },
  {
    type: "Class 3 Organization Combo DSC",
    basePrice: dscProducts["Class 3 Organization Combo DSC"],
    features: ["Company Registration", "GST", "Income Tax", "EPF", "ROC", "MCA21", "ICEGATE", "eTender", "GeM"],
    keywords: ["organization", "company", "business", "corporate", "gem", "tender", "procurement", "Corporate", "Business", "Organization", "MultiPurpose", "ICEGATE", "Tax", "File", "Tender", "eTender", "Procurement",
  "Vendor", "PSU", "Bidding", "GEM", "eProc", "EMD", "NIC", "CPPP", "Startup", "MSME", "IRCTC", "NSWS", "Security",
  "Compliance", "Authenticate", "Digital", "Enterprise", "Trade", "Bank", "LLP", "Pvt", "Company", "Secure",
  "Contracts", "RFP", "Quote", "RFI", "RFQ", "Proposal", "Govt", "Infra", "MOA", "Signing", "Bids", "Contractor",
  "EStamp", "PSUVendor", "Railways", "NTPC", "MMTC", "SEZ", "NICTender", "IOCLBidding", "BEMLTender", "OnlineBidding",
  "Eproc", "TendersIndia", "L1", "BidderPortal", "Legal", "EPF", "AICTE", "Document", "CBSE", "MOASign",
  "InfraTender", "EPCContracts", "Supplier", "TenderingSystem", "Buy", "BidSubmit", "TradeDSC",
  "NICBid", "SEZTender", "Logistics", "SmartCity", "GovtBid", "PublicTender", "MunicipalTender", "StateTender",
  "eBidder", "SecureTender", "OnlineQuotation", "PrivateBid", "TendersWorld", "ISRO", "DRDO", "HAL", "BEL",
  "IREDA", "CoalIndia", "NHPC", "SAIL", "PGCIL", "RITES", "RECL", "NHAI", "BDL", "EIL", "NPCIL", "RailTel",
  "NTPCBid", "PowerFinance", "NBCC", "HUDCO", "MinistryPortal", "BPCLProcure", "SECI", "WAPCOS", "ITBP", "BSNL",
  "EprocISRO", "GST", "IncomeTax", "EPF", "TrademarkRegister", "MCA21", "ROC", "DirectorKYC", "InvoiceSign",
  "IECCode", "Traces", "ICEGATE", "MEIS", "SEIS", "CERSAI", "Bhulekh", "Scholarship", "IRCTC", "IREPS", "AICTE",
  "CBSE", "AllGramPanchayat", "AllIndiaETender", "AllIndiaEProcure", "EprocISRO"]
  },
  {
    type: "DGFT Organization Signing DSC",
    basePrice: dscProducts["DGFT Organization Signing DSC"],
    features: ["DGFT Services", "Import/Export", "IEC", "ICEGATE"],
    keywords: ["dgft", "import", "export", "trade", "international", "iec", "DGFT", "ICEGATE", "Export", "Import", "EXIM", "Trade", "IEC", "Tax", "Customs", "Global", "Foreign", "Exchange",
  "TradeLicense", "Authenticate", "Secure", "Token", "Digital", "Business", "Logistics", "Shipping", "Freight",
  "Compliance", "Secure", "Gold", "Paperless", "Customs", "Cargo", "Cert", "DSC", "Vendor", "Contract", "Tender",
  "International", "FTZ", "Bid", "eProcurement", "SEZ", "eAuction", "CustomsFile", "LogisticsKey", "EFile",
  "StartupIndia", "CountryOrigin", "TradeSecure", "eShipping", "CargoDSC", "EOI", "GlobalBids", "FreightDSC",
  "CargoVendor", "CustomsDeclare", "TradeFinance", "ComplianceKey", "ForeignTrade", "ICEGATEApprove", "ImportExport",
  "ITCHS", "CargoTrack", "TradeVerify", "ShippingDocs", "InvoiceCert", "ExporterDSC", "SecureLogistics", "B2BTrade",
  "ForeignBid", "DGFTCert", "FTZTender", "MEISLogin", "SEISCode", "FIEO", "ExportData", "InternationalTax",
  "ICEGATE", "DGFTForeignTrade", "CountryOriginCode", "GoldRateExchangeDGFT"]
  },
  {
    type: "Foreign National Digital Signature Certificate",
    basePrice: dscProducts["Foreign National Digital Signature Certificate"],
    features: ["Foreign National Verification", "Company Registration", "Digital Signing", "International Business"],
    keywords: ["foreign", "international", "nri", "overseas", "non-resident", "Foreign", "NRI", "International", "Business", "Tax", "Compliance", "IEC", "Import", "Export", "Passport", "Secure",
  "MCA", "ROC", "KYC", "Company", "Digital", "Authenticate", "Signature", "eSign", "Online", "Secure", "Legal",
  "Trade", "EPF", "Identity", "Aadhaar", "Startup", "Token", "eGov", "File", "MOA", "Vendor", "Bidding", "Tender",
  "RFP", "RFQ", "EMD", "Procurement", "Overseas", "Invest", "MNC", "CrossBorder", "Offshore", "DSC", "Document",
  "Paperless", "EXIM", "Customs", "Embassy", "EOI", "GEM", "Bid", "Compliance", "TradePortal", "SEZ", "Contract",
  "Govt", "Infra", "Forex", "Diplomatic", "ForeignExchange", "GlobalTax", "NRIDSC", "CustomsFile", "ExportCompliance",
  "OffshoreFile", "IndiaTrade", "ForeignCompany", "BusinessDSC", "TaxRegister", "EmbassyCert", "TradeSecure",
  "ImportCert", "ExportVerify", "InvestorDSC", "InternationalGov", "ForeignSecure", "GlobalBidding", "StartupNRIDSC",
  "OverseasCom", "BorderTrade", "CustomsSecure", "DiplomaticDSC", "WTO", "APEC", "IATA", "UNProcure", "EmbassyTrade",
  "FDI", "ForeignDSC", "GlobalContract", "ValidForeign", "MCA21", "ROC", "DirectorKYC", "CompanyRegisterIndia",
  "DigitalSignDocs", "IECRegister", "ImportExportDocs", "ValidGovID", "PassportVerify", "AddressProof",
  "InternationalCompliance", "ExpressProcess"]
  }
];

export default function DSCFinder() {
  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState(2);
  const [includeToken, setIncludeToken] = useState(true);
  const [results, setResults] = useState<SearchResult[]>([]);

  const calculateRelevanceScore = (item: typeof dscDatabase[0], searchTerm: string): number => {
  let score = 0;
  const terms = searchTerm.toLowerCase().split(" ");

  terms.forEach(term => {
    item.keywords.forEach(keyword => {
      const lowerKeyword = keyword.toLowerCase();

      // ✅ Exact match → Higher score
      if (lowerKeyword.includes(term)) score += 5;

      // ✅ Typo match (up to 1 wrong character)
      else if (isFuzzyMatch(lowerKeyword, term, 1)) score += 3;

      // ✅ Typo match (up to 2 wrong characters)
      else if (isFuzzyMatch(lowerKeyword, term, 2)) score += 1;
    });

    // ✅ Also check type and features for additional matches
    if (item.type.toLowerCase().includes(term)) score += 2;
    if (item.features.some(f => f.toLowerCase().includes(term))) score += 1;
  });

  return score;
};

// ✅ Helper function to handle typos (Levenshtein Distance Algorithm)
const isFuzzyMatch = (keyword: string, term: string, maxDistance: number): boolean => {
  const levenshteinDistance = (a: string, b: string): number => {
    const dp = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }

    return dp[a.length][b.length];
  };

  return levenshteinDistance(keyword, term) <= maxDistance;
};

  const calculatePrice = (basePrice: number): number => {
    let finalPrice = basePrice;
    if (duration === 3) {
      finalPrice = Math.round(basePrice * 1.45);
    }
    if (includeToken && basePrice !== dscProducts["Class 3 Organization Signing DSC"]) {
      finalPrice += 310;
    } else if (includeToken && basePrice === dscProducts["Class 3 Organization Signing DSC"]) {
      finalPrice = 1300; // Token-inclusive price
    }
    return finalPrice;
  };

  const searchDSC = () => {
    const searchResults = dscDatabase
      .map(item => {
        const score = search.trim() ? calculateRelevanceScore(item, search) : 1;
        return {
          type: item.type,
          price: calculatePrice(item.basePrice),
          relevanceScore: score,
          features: item.features
        };
      })
      .filter(item => search.trim() ? item.relevanceScore >= 1 : true)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    setResults(searchResults);
  };

  useEffect(() => {
  if (Object.keys(dscProducts).length > 0) {
    searchDSC();
  }
}, [search, duration, includeToken, dscProducts]);

  return (
   <div className="p-8 bg-gray-50 rounded-2xl shadow-md w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">DSC Finder</h2>
        <p className="text-gray-600">Find the perfect Digital Signature Certificate for your needs</p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search by purpose (e.g., GST, Income Tax, eTender)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            onClick={searchDSC}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg">
          <div className="flex gap-2">
            <Button
              onClick={() => setDuration(2)}
              variant={duration === 2 ? "default" : "outline"}
            >
              2 Years
            </Button>
            <Button
              onClick={() => setDuration(3)}
              variant={duration === 3 ? "default" : "outline"}
            >
              3 Years
            </Button>
          </div>

          <Button
            onClick={() => setIncludeToken(!includeToken)}
            variant={includeToken ? "default" : "outline"}
          >
            {includeToken ? "Include Token (+₹310)" : "Exclude Token"}
          </Button>
        </div>

        <div className="grid gap-4">
          {results.length > 0 ? (
            results.map((result, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{result.type}</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {result.features.slice(0, 3).join(" • ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">₹{result.price}/-</p>
                      <p className="text-sm text-gray-500">{duration} Years {includeToken ? '(with Token)' : ''}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                   <Button
  onClick={() => {
    const message = `Hello, I'm interested in ${result.type} for ₹${result.price}/- (${duration} years)${includeToken ? ' with USB token' : ''}. Please provide more details.`;
    window.open(`https://wa.me/7388288022?text=${encodeURIComponent(message)}`, '_blank');
  }}
  className="bg-green-500 hover:bg-green-600 text-white font-semibold text-sm py-2 px-4 rounded-md shadow-sm transition-transform transform hover:scale-105"
>
  Get Quote
</Button>

                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No DSCs found matching your criteria</p>
              <Button
                onClick={() => {
                  const message = `Hello, I need help finding a DSC for: ${search}`;
                  window.open(`https://wa.me/7388288022?text=${encodeURIComponent(message)}`, '_blank');
                }}
                variant="outline"
              >
                Contact Support for Help
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}