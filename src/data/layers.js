export const layers = {
  education: {
    label: "Education",
    color: "#3b82f6",
    icon: "🎓",
    points: [
      { id: "edu1", name: "DPS School", coordinates: [72.5120, 23.0410] },
      { id: "edu2", name: "CEPT University", coordinates: [72.5600, 23.0280] },
      { id: "edu3", name: "IIM Ahmedabad", coordinates: [72.5264, 23.0331] },
      { id: "edu4", name: "Gujarat University", coordinates: [72.5503, 23.0388] },
    ],
  },
  hospitals: {
    label: "Hospitals",
    color: "#ef4444",
    icon: "🏥",
    points: [
      { id: "hos1", name: "Apollo Hospital", coordinates: [72.5200, 23.0350] },
      { id: "hos2", name: "Sterling Hospital", coordinates: [72.5050, 23.0290] },
      { id: "hos3", name: "CIMS Hospital", coordinates: [72.5080, 23.0420] },
    ],
  },
  shopping: {
    label: "Shopping",
    color: "#f59e0b",
    icon: "🛍",
    points: [
      { id: "sh1", name: "Palladium Mall", coordinates: [72.5140, 23.0300] },
      { id: "sh2", name: "Iscon Mega Mall", coordinates: [72.5060, 23.0360] },
      { id: "sh3", name: "Alpha One Mall", coordinates: [72.5240, 23.0140] },
    ],
  },
  metro: {
    label: "Metro",
    color: "#8b5cf6",
    stations: [
      { id: "m1", name: "Vastral", coordinates: [72.6480, 23.0220] },
      { id: "m2", name: "Apparel Park", coordinates: [72.6020, 23.0260] },
      { id: "m3", name: "Rabari Colony", coordinates: [72.5760, 23.0270] },
      { id: "m4", name: "Kalupur", coordinates: [72.5990, 23.0297] },
      { id: "m5", name: "Old High Court", coordinates: [72.5870, 23.0303] },
      { id: "m6", name: "Gheekanta", coordinates: [72.5820, 23.0310] },
      { id: "m7", name: "Paldi", coordinates: [72.5680, 23.0170] },
      { id: "m8", name: "Shreyas", coordinates: [72.5530, 23.0090] },
      { id: "m9", name: "Jivraj Park", coordinates: [72.5370, 23.0020] },
      { id: "m10", name: "Vasna", coordinates: [72.5240, 23.0070] },
      { id: "m11", name: "Thaltej", coordinates: [72.4980, 23.0540] },
      { id: "m12", name: "Sola", coordinates: [72.5140, 23.0580] },
    ],
    lines: [
      {
        id: "east-west",
        name: "East-West Line",
        color: "#ef4444",
        coordinates: [
          [72.6480, 23.0220],
          [72.6020, 23.0260],
          [72.5760, 23.0270],
          [72.5590, 23.0297],
          [72.5240, 23.0070],
        ],
      },
      {
        id: "north-south",
        name: "North-South Line",
        color: "#3b82f6",
        coordinates: [
          [72.4980, 23.0540],
          [72.5140, 23.0580],
          [72.5200, 23.0350],
          [72.5200, 23.0050],
        ],
      },
    ],
  },
}
