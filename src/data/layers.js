export const layers = {
  landmarks: {
    label: "Landmarks",
    points: [
      { id: "lm1", name: "Kingdom Centre Tower", coordinates: [46.6831, 24.6912] },
      { id: "lm2", name: "Al Faisaliah Tower",   coordinates: [46.6850, 24.6892] },
      { id: "lm3", name: "Diriyah Gate",          coordinates: [46.5763, 24.7339] },
      { id: "lm4", name: "National Museum",       coordinates: [46.7139, 24.6890] },
      { id: "lm5", name: "King Abdullah Park",    coordinates: [46.6710, 24.7100] },
    ],
  },
  education: {
    label: "Education",
    color: "#3b82f6",
    icon: "🎓",
    points: [
      { id: "edu1", name: "King Saud University", coordinates: [46.7111, 24.7093] },
      { id: "edu2", name: "Prince Sultan University", coordinates: [46.7750, 24.6860] },
      { id: "edu3", name: "Dar Al Uloom University", coordinates: [46.7250, 24.7100] },
      { id: "edu4", name: "International School of Riyadh", coordinates: [46.6900, 24.7580] },
    ],
  },
  hospitals: {
    label: "Hospitals",
    color: "#ef4444",
    icon: "🏥",
    points: [
      { id: "hos1", name: "King Faisal Specialist Hospital", coordinates: [46.6718, 24.7100] },
      { id: "hos2", name: "Saudi German Hospital", coordinates: [46.7650, 24.7200] },
      { id: "hos3", name: "Dr. Sulaiman Al-Habib Hospital", coordinates: [46.6850, 24.7010] },
    ],
  },
  shopping: {
    label: "Shopping",
    color: "#f59e0b",
    icon: "🛍",
    points: [
      { id: "sh1", name: "Kingdom Centre Mall", coordinates: [46.6831, 24.6912] },
      { id: "sh2", name: "Mall of Arabia", coordinates: [46.5870, 24.6570] },
      { id: "sh3", name: "Riyadh Park Mall", coordinates: [46.6500, 24.7930] },
    ],
  },
  metro: {
    label: "Metro",
    color: "#8b5cf6",
    stations: [
      { id: "m1", name: "Al Mashaer", coordinates: [46.5600, 24.7550] },
      { id: "m2", name: "Al Shohadaa", coordinates: [46.6200, 24.7500] },
      { id: "m3", name: "Qasr Al Hokm", coordinates: [46.6700, 24.6900] },
      { id: "m4", name: "Al Salam", coordinates: [46.7300, 24.6840] },
      { id: "m5", name: "East Station", coordinates: [46.8200, 24.6780] },
      { id: "m6", name: "Al Malqa", coordinates: [46.6450, 24.8000] },
      { id: "m7", name: "KAFD Station", coordinates: [46.6600, 24.7730] },
      { id: "m8", name: "King Fahd", coordinates: [46.6720, 24.7200] },
      { id: "m9", name: "Olaya Station", coordinates: [46.6820, 24.6920] },
      { id: "m10", name: "Al Batha", coordinates: [46.6900, 24.6400] },
    ],
    lines: [
      {
        id: "east-west",
        name: "Blue Line (East–West)",
        color: "#3b82f6",
        coordinates: [
          [46.4800, 24.7530],
          [46.5600, 24.7550],
          [46.6200, 24.7500],
          [46.6700, 24.6900],
          [46.7300, 24.6840],
          [46.8200, 24.6780],
        ],
      },
      {
        id: "north-south",
        name: "Orange Line (North–South)",
        color: "#f97316",
        coordinates: [
          [46.6450, 24.8000],
          [46.6600, 24.7730],
          [46.6720, 24.7200],
          [46.6820, 24.6920],
          [46.6900, 24.6400],
        ],
      },
    ],
  },
}
