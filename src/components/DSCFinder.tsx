import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Search } from "lucide-react";
import { dscProducts } from "../data/products";

interface AIRecommendation {
  confidence: number;
  reason: string;
  suggestedUse: string[];
}

interface SearchResult {
  type: string;
  price: number;
  relevanceScore: number;
  features: string[];
  aiRecommendation?: AIRecommendation;
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
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<string>("");

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

// ✅ AI-powered recommendation system
const generateAIRecommendation = (item: typeof dscDatabase[0], searchTerm: string): AIRecommendation => {
  const terms = searchTerm.toLowerCase().split(" ");
  let confidence = 0;
  const reasons: string[] = [];
  const suggestedUse: string[] = [];

  // Analyze search intent
  if (terms.some(t => ["gst", "tax", "filing"].includes(t))) {
    confidence += 20;
    reasons.push("Perfect for tax compliance");
    suggestedUse.push("GST Filing", "Income Tax Returns");
  }

  if (terms.some(t => ["tender", "bid", "procurement", "gem"].includes(t))) {
    confidence += 25;
    reasons.push("Ideal for government tenders");
    suggestedUse.push("e-Tendering", "GeM Portal", "Government Procurement");
  }

  if (terms.some(t => ["startup", "company", "business"].includes(t))) {
    confidence += 15;
    reasons.push("Great for business registration");
    suggestedUse.push("Company Registration", "Startup India", "MCA Filing");
  }

  if (terms.some(t => ["import", "export", "trade", "dgft"].includes(t))) {
    confidence += 30;
    reasons.push("Essential for international trade");
    suggestedUse.push("Import/Export", "DGFT Services", "ICEGATE");
  }

  return {
    confidence: Math.min(confidence, 95),
    reason: reasons.join(" • ") || "Suitable for your requirements",
    suggestedUse: suggestedUse.length > 0 ? suggestedUse : item.features.slice(0, 3)
  };
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
    setIsLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
    const searchResults = dscDatabase
      .map(item => {
        const score = search.trim() ? calculateRelevanceScore(item, search) : 1;
          const aiRec = search.trim() ? generateAIRecommendation(item, search) : undefined;
          
        return {
          type: item.type,
          price: calculatePrice(item.basePrice),
          relevanceScore: score,
            features: item.features,
            aiRecommendation: aiRec
        };
      })
      .filter(item => search.trim() ? item.relevanceScore >= 1 : true)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    setResults(searchResults);
      
      // Generate AI insights
      if (search.trim() && searchResults.length > 0) {
        const topResult = searchResults[0];
        setAiInsights(`🤖 AI Analysis: Based on "${search}", I recommend ${topResult.type} with ${topResult.aiRecommendation?.confidence}% confidence. ${topResult.aiRecommendation?.reason}`);
      } else {
        setAiInsights("");
      }
      
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
  if (Object.keys(dscProducts).length > 0) {
    searchDSC();
  }
}, [search, duration, includeToken, dscProducts]);

  return (
   <div className="p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-xl w-full max-w-4xl mx-auto border border-blue-100">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          🤖 AI-Powered DSC Finder
        </h2>
        <p className="text-gray-600">Intelligent recommendations for your Digital Signature Certificate needs</p>
      </div>

      {/* AI Insights Banner */}
      {aiInsights && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-blue-800 font-medium">{aiInsights}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex gap-2 relative">
          <div className="flex-1">
            <Input
              placeholder="🔍 Describe your needs (e.g., GST filing, e-tendering, startup registration)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
            {isLoading && (
              <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
          <Button
            onClick={searchDSC}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
          >
            <Search className="w-5 h-5" />
            <span>{isLoading ? 'Analyzing...' : 'Find DSC'}</span>
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex gap-2">
            <Button
              onClick={() => setDuration(2)}
              className={`px-4 py-2 rounded-lg transition-all ${
                duration === 2 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              2 Years
            </Button>
            <Button
              onClick={() => setDuration(3)}
              className={`px-4 py-2 rounded-lg transition-all ${
                duration === 3 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              3 Years
            </Button>
          </div>

          <Button
            onClick={() => setIncludeToken(!includeToken)}
            className={`px-4 py-2 rounded-lg transition-all ${
              includeToken 
                ? 'bg-green-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {includeToken ? "Include Token (+₹310)" : "Exclude Token"}
          </Button>
        </div>

        <div className="grid gap-4">
          {results.length > 0 ? (
            results.map((result, index) => (
              <Card key={index} className="hover:shadow-xl transition-all transform hover:scale-[1.02] border-l-4 border-l-blue-500 bg-gradient-to-r from-white to-blue-50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-gray-800">{result.type}</h3>
                        {result.aiRecommendation && result.aiRecommendation.confidence > 70 && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            🎯 {result.aiRecommendation.confidence}% Match
                          </span>
                        )}
                      </div>
                      
                      {result.aiRecommendation ? (
                        <div className="space-y-1">
                          <p className="text-blue-700 text-sm font-medium">
                            💡 {result.aiRecommendation.reason}
                          </p>
                          <p className="text-gray-600 text-sm">
                            Best for: {result.aiRecommendation.suggestedUse.slice(0, 3).join(" • ")}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-600 text-sm mt-1">
                          {result.features.slice(0, 3).join(" • ")}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">₹{result.price}/-</p>
                      <p className="text-sm text-gray-500">{duration} Years {includeToken ? '(with Token)' : ''}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                   <Button
  onClick={() => {
    const message = `Hello, I'm interested in ${result.type} for ₹${result.price}/- (${duration} years)${includeToken ? ' with USB token' : ''}. Please provide more details.`;
    window.open(`https://wa.me/7388288022?text=${encodeURIComponent(message)}`, '_blank');
  }}
  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-sm py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
>
  💬 Get Quote on WhatsApp
</Button>
                    
                    <Button
                      onClick={() => {
                        const message = `I need more information about ${result.type} and its applications.`;
                        window.open(`https://wa.me/7388288022?text=${encodeURIComponent(message)}`, '_blank');
                      }}
                      className="bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold text-sm py-3 px-6 rounded-lg transition-all"
                    >
                      📞 Call Expert
                    </Button>

                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg">
              <div className="text-6xl mb-4">🤖</div>
              <p className="text-gray-600 mb-6 text-lg">No DSCs found matching your criteria</p>
              <Button
                onClick={() => {
                  const message = `Hello, I need help finding a DSC for: ${search}`;
                  window.open(`https://wa.me/7388288022?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                🆘 Get Expert Help
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}