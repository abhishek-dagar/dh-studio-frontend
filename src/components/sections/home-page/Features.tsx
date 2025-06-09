import { motion } from "motion/react";

const features = [
  {
    title: "Visual Table Editor",
    description:
      "Edit your database tables with an intuitive UI. Add, modify, or delete records with simple clicks.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M15 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    title: "Schema Designer",
    description:
      "Create and modify table structures with a powerful schema designer. Define relationships, constraints, and indexes visually.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3h18v18H3z" />
        <path d="M21 9H3" />
        <path d="M21 15H3" />
        <path d="M12 3v18" />
      </svg>
    ),
  },
  {
    title: "Advanced Query Editor",
    description:
      "Write and execute SQL queries with syntax highlighting, auto-completion, and query history tracking.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
  },
  {
    title: "Data Export",
    description:
      "Export your data in multiple formats including CSV, JSON, and SQL. Schedule automated exports for backup.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    title: "Schema Visualization",
    description:
      "Visualize your database schema with interactive diagrams. Understand relationships and dependencies at a glance.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: "Multi-Database Support",
    description:
      "Connect and manage multiple databases including PostgreSQL, MongoDB, and more from a single interface.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C6.48 2 2 4.48 2 7.5v9C2 19.52 6.48 22 12 22s10-2.48 10-5.5v-9C22 4.48 17.52 2 12 2z" />
        <path d="M2 7.5C2 10.52 6.48 13 12 13s10-2.48 10-5.5" />
        <path d="M2 12c0 3.02 4.48 5.5 10 5.5s10-2.48 10-5.5" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const AnimatedBackground = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return (
        <motion.svg
          className="absolute bottom-20 -right-4 h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64 opacity-100"
          viewBox="0 0 200 120"
          initial="hidden"
          animate="visible"
        >
          {/* Main Background */}
          <motion.rect
            x="0"
            y="0"
            width="200"
            height="120"
            rx="4"
            fill="#191B1F"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Top Navigation Bar */}
          <motion.rect
            x="0"
            y="0"
            width="200"
            height="16"
            rx="4"
            fill="#191B1F"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          
          {/* User Tab */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <rect x="4" y="4" width="20" height="12" rx="2" fill="#203E2D" stroke="#24B459" strokeWidth="0.5" />
            <text x="9" y="11" fontSize="3" fill="#ffffff" fontFamily="monospace">User</text>
          </motion.g>
          
          {/* Query Tab */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <text x="30" y="11" fontSize="3" fill="#9ca3af" fontFamily="monospace">{"<>"}</text>
            <text x="36" y="11" fontSize="3" fill="#9ca3af" fontFamily="monospace">Query-1</text>
          </motion.g>
          
          {/* Plus Button */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <rect x="60" y="4" width="12" height="12" rx="2" fill="#24B459" />
            <text x="66" y="14" fontSize="12" fill="#191B1F" textAnchor="middle" fontFamily="monospace">+</text>
          </motion.g>
          
          {/* Pagination Info */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <text x="4" y="26" fontSize="2.5" fill="#9ca3af" fontFamily="monospace">2 : 2 rows</text>
            <rect x="26" y="20" width="12" height="8" rx="1" fill="##191B1F" stroke="#3D444D" strokeWidth="0.5" />
            <text x="32" y="25" fontSize="2.5" fill="#e5e7eb" textAnchor="middle" fontFamily="monospace">50</text>
          </motion.g>
          
          {/* Action Buttons */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <rect x="140" y="20" width="24" height="8" rx="2" fill="#26272C" stroke="#3D444D" strokeWidth={"0.5"} />
            <text x="152" y="25" fontSize="2.5" fill="#ffffff" textAnchor="middle" fontFamily="monospace">+ Add Record</text>
            
            <rect x="168" y="20" width="16" height="8" rx="2" fill="#26272C" stroke="#3D444D" strokeWidth={"0.5"} />
            <text x="176" y="25" fontSize="2.5" fill="#e5e7eb" textAnchor="middle" fontFamily="monospace">Filter</text>
          </motion.g>
          
          {/* Table Header */}
          <motion.rect
            x="0"
            y="32"
            width="200"
            height="12"
            fill="#1F2428"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
          
          {/* Column Headers */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {/* Key Icon and id column */}
            <text x="7" y="40" fontSize="2.5" fill="#fbbf24" fontFamily="monospace">🔑</text>
            <text x="12" y="40" fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">id</text>
            <text x="18" y="40" fontSize="2" fill="#9ca3af" fontFamily="monospace">text</text>
            
            {/* name column */}
            <text x="30" y="40" fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">name</text>
            <text x="42" y="40" fontSize="2" fill="#9ca3af" fontFamily="monospace">text</text>
            
            {/* firstName column */}
            <text x="54" y="40" fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">firstName</text>
            <text x="74" y="40" fontSize="2" fill="#9ca3af" fontFamily="monospace">text</text>
            
            {/* lastName column */}
            <text x="88" y="40" fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">lastName</text>
            <text x="108" y="40" fontSize="2" fill="#9ca3af" fontFamily="monospace">text</text>
            
            {/* phone column */}
            <text x="120" y="40" fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">phone</text>
            <text x="134" y="40" fontSize="2" fill="#9ca3af" fontFamily="monospace">text</text>
            
            {/* email column */}
            <text x="148" y="40" fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">email</text>
          </motion.g>
          
          
          
          {/* Table Rows */}
          {[
            { 
              id: "01fa0c9f-d1e3", 
              name: "Abhishek Dagar", 
              firstName: "Abhishek", 
              lastName: "Dagar", 
              phone: "1234", 
              email: "dagar@"
            },
            { 
              id: "64a8a976-1f23", 
              name: "Abhishek Dagar", 
              firstName: "Abhishek", 
              lastName: "Dagar", 
              phone: "1234", 
              email: "temp@"
            }
          ].map((row, rowIndex) => (
            <motion.g
              key={rowIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.0 + rowIndex * 0.1 }}
            >
              
              {/* Row Number */}
              <text x="2" y={50 + rowIndex * 10} fontSize="2.5" fill="#9ca3af" fontFamily="monospace">{rowIndex + 1}</text>
              
              {/* Row Data */}
              <text x="7" y={50 + rowIndex * 10} fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">{row.id}</text>
              <text x="30" y={50 + rowIndex * 10} fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">{row.name}</text>
              <text x="54" y={50 + rowIndex * 10} fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">{row.firstName}</text>
              <text x="88" y={50 + rowIndex * 10} fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">{row.lastName}</text>
              <text x="120" y={50 + rowIndex * 10} fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">{row.phone}</text>
              <text x="148" y={50 + rowIndex * 10} fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">{row.email}</text>
              
              {/* Row Separator */}
              <line
                x1="0"
                y1={55 + rowIndex * 10}
                x2="200"
                y2={55 + rowIndex * 10}
                stroke="#374151"
                strokeWidth="0.5"
              />
            </motion.g>
          ))}

          {/* Column Separators */}
          {[6, 28, 52, 86, 118, 146].map((x, i) => (
            <motion.line
              key={i}
              x1={x}
              y1="32"
              x2={x}
              y2="65"
              stroke="#3F454E"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.9 + i * 0.05 }}
            />
          ))}
          
          {/* Hover Effect on First Row */}
          <motion.rect
            x="0"
            y="40"
            width="200"
            height="10"
            fill="#24B459"
            fillOpacity="0.1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 3, delay: 2, repeat: Infinity, repeatDelay: 5 }}
          />
          
          {/* Edit Indicator */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: 3, repeat: Infinity, repeatDelay: 6 }}
          >
            <circle cx="24" cy="54" r="1" fill="#24B459" />
            <text x="26" y="56" fontSize="2" fill="#24B459" fontFamily="monospace">editing...</text>
          </motion.g>
        </motion.svg>
      );

    case 1:
      return (
        <motion.svg
          className="absolute bottom-0 right-0 h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 opacity-10"
          viewBox="0 0 100 100"
          initial="hidden"
          animate="visible"
        >
          <motion.g>
            {[...Array(3)].map((_, i) => (
              <g key={i}>
                <motion.circle
                  cx={30 + i * 20}
                  cy={30 + i * 20}
                  r="5"
                  fill="#24B459"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity
                  }}
                />
                <motion.line
                  x1={35 + i * 20}
                  y1={35 + i * 20}
                  x2={50 + i * 20}
                  y2={50 + i * 20}
                  stroke="#63D68D"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.3,
                    repeat: Infinity
                  }}
                />
              </g>
            ))}
          </motion.g>
        </motion.svg>
      );

    case 2:
      return (
        <motion.svg
          className="absolute top-0 right-0 h-40 w-40 sm:h-48 sm:w-48 lg:h-56 lg:w-56 opacity70"
          viewBox="0 0 180 140"
          initial="hidden"
          animate="visible"
        >
          {/* Editor Background */}
          <motion.rect
            x="0"
            y="0"
            width="180"
            height="140"
            rx="6"
            fill="#191B1F"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Top Bar */}
          <motion.rect
            x="0"
            y="0"
            width="180"
            height="20"
            fill="#191B1F"
            rx={6}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          
          {/* User Tab */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <rect x="8" y="4" width="25" height="12" rx="2" fill="#191B1F" />
            <text x="10" y="12" fontSize="4" fill="#e2e8f0" fontFamily="monospace">User</text>
          </motion.g>
          
          {/* Query Tab */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <rect x="38" y="4" width="45" height="12" rx="2" fill="#203E2D" stroke="#24B459" strokeWidth="0.5" />
            <text x="40" y="12" fontSize="4" fill="#ffffff" fontFamily="monospace">{"<>"}</text>
            <text x="47" y="12" fontSize="4" fill="#ffffff" fontFamily="monospace">Query-1</text>
          </motion.g>
          
          {/* Plus Button */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <rect x="88" y="4" width="12" height="12" rx="2" fill="#24B459" />
            <text x="94" y="14" fontSize="12" fill="#191B1F" textAnchor="middle" fontFamily="monospace">+</text>
          </motion.g>
          
          {/* Line Numbers Background */}
          <motion.rect
            x="0"
            y="20"
            width="18"
            height="120"
            fill="#191B1F"
            rx={6}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          
          {/* Line Numbers */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => (
            <motion.text
              key={num}
              x="14"
              y={32 + i * 8}
              fontSize="3.5"
              fill="#718096"
              textAnchor="end"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
            >
              {num}
            </motion.text>
          ))}
          
          {/* SQL Code Lines */}
          <motion.g fontFamily="monospace" fontSize="3.5">
            {/* Line 1: CREATE TABLE users ( */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <text x="22" y="32" fill="#e53e3e">CREATE TABLE</text>
              <text x="52" y="32" fill="#e2e8f0">users (</text>
            </motion.g>
            
            {/* Line 2: id SERIAL PRIMARY KEY, */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            >
              <text x="26" y="40" fill="#e2e8f0">id</text>
              <text x="35" y="40" fill="#63b3ed">SERIAL</text>
              <text x="54" y="40" fill="#63b3ed">PRIMARY KEY</text>
              <text x="82" y="40" fill="#e2e8f0">,</text>
            </motion.g>
            
            {/* Line 3: username VARCHAR(50) NOT NULL UNIQUE, */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.0 }}
            >
              <text x="26" y="48" fill="#e2e8f0">username</text>
              <text x="56" y="48" fill="#63b3ed">VARCHAR</text>
              <text x="80" y="48" fill="#e2e8f0">(50)</text>
              <text x="92" y="48" fill="#63b3ed">NOT NULL UNIQUE</text>
              <text x="138" y="48" fill="#e2e8f0">,</text>
            </motion.g>
            
            {/* Line 4: email VARCHAR(100) NOT NULL UNIQUE, */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.1 }}
            >
              <text x="26" y="56" fill="#e2e8f0">email</text>
              <text x="46" y="56" fill="#63b3ed">VARCHAR</text>
              <text x="70" y="56" fill="#e2e8f0">(100)</text>
              <text x="86" y="56" fill="#63b3ed">NOT NULL UNIQUE</text>
              <text x="132" y="56" fill="#e2e8f0">,</text>
            </motion.g>
            
            {/* Line 5: password_hash VARCHAR(255) NOT NULL, */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.2 }}
            >
              <text x="26" y="64" fill="#e2e8f0">password_hash</text>
              <text x="72" y="64" fill="#63b3ed">VARCHAR</text>
              <text x="96" y="64" fill="#e2e8f0">(255)</text>
              <text x="112" y="64" fill="#63b3ed">NOT NULL</text>
              <text x="136" y="64" fill="#e2e8f0">,</text>
            </motion.g>
            
            {/* Line 6: full_name VARCHAR(100), */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.3 }}
            >
              <text x="26" y="72" fill="#e2e8f0">full_name</text>
              <text x="60" y="72" fill="#63b3ed">VARCHAR</text>
              <text x="84" y="72" fill="#e2e8f0">(100),</text>
            </motion.g>
            
            {/* Line 7: date_of_birth DATE, */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.4 }}
            >
              <text x="26" y="80" fill="#e2e8f0">date_of_birth</text>
              <text x="72" y="80" fill="#63b3ed">DATE</text>
              <text x="88" y="80" fill="#e2e8f0">,</text>
            </motion.g>
            
            {/* Line 8: created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.5 }}
            >
              <text x="26" y="88" fill="#e2e8f0">created_at</text>
              <text x="62" y="88" fill="#63b3ed">TIMESTAMP</text>
              <text x="88" y="88" fill="#63b3ed">DEFAULT CURRENT_TIMESTAMP</text>
              <text x="156" y="88" fill="#e2e8f0">,</text>
            </motion.g>
            
            {/* Line 9: updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.6 }}
            >
              <text x="26" y="96" fill="#e2e8f0">updated_at</text>
              <text x="62" y="96" fill="#63b3ed">TIMESTAMP</text>
              <text x="88" y="96" fill="#63b3ed">DEFAULT CURRENT_TIMESTAMP</text>
            </motion.g>
            
            {/* Line 10: ); */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.7 }}
            >
              <text x="22" y="104" fill="#e2e8f0">);</text>
            </motion.g>
          </motion.g>
          
          {/* Cursor */}
          <motion.rect
            x="22"
            y="108"
            width="1"
            height="8"
            fill="#24B459"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 2 }}
          />
          
          {/* Selection Highlight */}
          <motion.rect
            x="22"
            y="110"
            width="156"
            height="6"
            fill="#4a5568"
            fillOpacity="0.3"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 3, repeatDelay: 2 }}
          />
        </motion.svg>
      );

    case 3:
      return (
        <motion.svg
          className="absolute top-0 right-0 h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64 opacity-80"
          viewBox="0 0 160 120"
          initial="hidden"
          animate="visible"
        >
          {/* Modal Background */}
          <motion.rect
            x="10"
            y="10"
            width="140"
            height="100"
            rx="6"
            fill="#191B1F"
            stroke="#3D444D"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Close Button */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <circle cx="140" cy="20" r="3" fill="#3D444D" />
            <text x="140" y="22" fontSize="4" fill="#9ca3af" textAnchor="middle" fontFamily="monospace">×</text>
          </motion.g>
          
          {/* Title */}
          <motion.text
            x="15"
            y="25"
            fontSize="5"
            fill="#ffffff"
            fontFamily="monospace"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Export Data
          </motion.text>
          
          {/* Subtitle */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <text x="15" y="35" fontSize="2.5" fill="#9ca3af" fontFamily="monospace">Export Data to CSV, JSON, or Excel File. If number of records are greater, it will</text>
            <text x="15" y="39" fontSize="2.5" fill="#9ca3af" fontFamily="monospace">run in background</text>
          </motion.g>
          
          {/* Export Label */}
          <motion.text
            x="15"
            y="50"
            fontSize="3.5"
            fill="#ffffff"
            fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            Export
          </motion.text>
          
          {/* Filtered Data Dropdown */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <rect x="15" y="54" width="60" height="10" rx="2" fill="#191B1F" stroke="#24B459" strokeWidth="1" />
            <text x="18" y="61" fontSize="3" fill="#ffffff" fontFamily="monospace">Filtered Data</text>
            <text x="68" y="61" fontSize="3" fill="#24B459" fontFamily="monospace">⌄</text>
          </motion.g>
          
          {/* File Name Section */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <text x="15" y="75" fontSize="3.5" fill="#ffffff" fontFamily="monospace">File Name</text>
            <rect x="15" y="78" width="80" height="8" rx="2" fill="#191B1F" stroke="#3D444D" strokeWidth="0.5" />
            <text x="18" y="84" fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">User-09-06-2025-14-01-19</text>
          </motion.g>
          
          {/* Format Section */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <text x="100" y="75" fontSize="3.5" fill="#ffffff" fontFamily="monospace">Format</text>
            <rect x="100" y="78" width="35" height="8" rx="2" fill="#191B1F" stroke="#3D444D" strokeWidth="0.5" />
            <text x="103" y="84" fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">CSV (.csv)</text>
            <text x="128" y="84" fontSize="3" fill="#9ca3af" fontFamily="monospace">⌄</text>
          </motion.g>
          
          {/* Output Directory Section */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            <text x="15" y="95" fontSize="3.5" fill="#ffffff" fontFamily="monospace">Output Directory</text>
            <rect x="15" y="98" width="100" height="8" rx="2" fill="#191B1F" stroke="#3D444D" strokeWidth="0.5" />
            <text x="18" y="104" fontSize="2.5" fill="#e5e7eb" fontFamily="monospace">/Users/abhishekdagar/Downloads</text>
            <rect x="118" y="98" width="18" height="8" rx="2" fill="#26272C" stroke="#3D444D" strokeWidth="0.5" />
            <text x="127" y="104" fontSize="2.5" fill="#ffffff" textAnchor="middle" fontFamily="monospace">Choose</text>
          </motion.g>
          
          {/* Export Button */}
          <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 1.0 }}
          >
            <rect x="115" y="108" width="20" height="8" rx="3" fill="#24B459" />
            <text x="125" y="114" fontSize="3" fill="#ffffff" textAnchor="middle" fontFamily="monospace">Export</text>
          </motion.g>
          
          {/* Animated Export Process */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {/* Progress indicator */}
            <rect x="15" y="108" width="80" height="2" rx="1" fill="#26272C" />
            <motion.rect
              x="15"
              y="108"
              height="2"
              rx="1"
              fill="#24B459"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 2, delay: 2.5, repeat: Infinity, repeatDelay: 3 }}
            />
            <text x="15" y="116" fontSize="2" fill="#24B459" fontFamily="monospace">Exporting...</text>
          </motion.g>
          
          {/* File Export Animation */}
          {[0, 1, 2].map((i) => (
            <motion.g
              key={`export-${i}`}
              initial={{ opacity: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [0, -10, -20],
                x: [0, 5, 10]
              }}
              transition={{ 
                duration: 2,
                delay: 3 + i * 0.3,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeOut"
              }}
            >
              <rect x={120 + i * 5} y="85" width="8" height="10" rx="1" fill="#24B459" fillOpacity="0.7" />
              <text x={124 + i * 5} y="92" fontSize="2" fill="#ffffff" textAnchor="middle" fontFamily="monospace">📄</text>
            </motion.g>
          ))}
        </motion.svg>
      );

    case 4:
      return (
        <motion.svg
          className="absolute bottom-0 right-0 h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 opacity-10"
          viewBox="0 0 100 100"
        >
          <motion.path
            d="M10 90 L30 40 L50 60 L70 20 L90 50"
            fill="none"
            stroke="#24B459"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M10 80 L30 60 L50 70 L70 30 L90 40"
            fill="none"
            stroke="#63D68D"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
          />
        </motion.svg>
      );

    case 5:
      return (
        <motion.svg
          className="absolute bottom-0 right-0 h-32 w-32 sm:h-40 sm:w-40 lg:h-full lg:w-full opacity-10"
          viewBox="0 0 200 100"
        >
          {[...Array(3)].map((_, i) => (
            <g key={i}>
              <motion.circle
                cx={50 + i * 50}
                cy="50"
                r="20"
                fill="none"
                stroke="#24B459"
                strokeWidth="2"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.path
                d={`M${70 + i * 50} 50 L${80 + i * 50} 50`}
                stroke="#63D68D"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  repeat: Infinity
                }}
              />
            </g>
          ))}
        </motion.svg>
      );

    default:
      return null;
  }
};

export default function Features() {
  return (
    <section className="relative overflow-hidden pb-4 lg:pb-8">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Dot Grid Pattern */}
        <div className="bg-gradient-circle-light dark:bg-gradient-circle-dark absolute inset-0" />

        {/* Animated Gradient Blobs */}
        <motion.div
          className="absolute left-10 top-10 h-64 w-64 rounded-full bg-[#24B459]/20 blur-3xl dark:bg-[#24B459]/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#63D68D]/20 blur-3xl dark:bg-[#63D68D]/10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Additional Animated Elements */}
        <motion.div
          className="absolute right-1/4 top-1/4 h-48 w-48 rounded-full bg-[#24B459]/15 blur-2xl dark:bg-[#24B459]/10"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-[#63D68D]/15 blur-2xl dark:bg-[#63D68D]/10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-[#24B459]/30 dark:bg-[#24B459]/20"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 40}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Curved Lines */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.08] dark:opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 Q600,400 1200,0 T2400,0"
            fill="none"
            stroke="#24B459"
            strokeWidth="2"
          />
          <path
            d="M0,200 Q600,600 1200,200 T2400,200"
            fill="none"
            stroke="#63D68D"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="container relative mx-auto px-4 py-16">
        <div className="mb-20 text-center">
          {/* Decorative Elements */}
          <div className="relative mb-6">
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#24B459]/20 blur-[32px]" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative inline-flex items-center justify-center rounded-full border border-[#24B459]/20 bg-gradient-to-r from-[#24B459]/10 to-[#63D68D]/10 px-4 py-2"
            >
              <span className="bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-xs font-semibold text-transparent sm:text-sm md:text-base">
                Features & Capabilities
              </span>
            </motion.div>
          </div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="relative mb-6 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                Powerful Features for Modern
              </span>
              <br className="hidden sm:block" />
              <span className="relative mt-2 inline-block sm:mt-0">
                <span className="relative z-10 bg-gradient-to-r from-[#24B459] to-[#63D68D] bg-clip-text text-transparent">
                  Database Management
                </span>
                <svg
                  className="absolute -bottom-9 left-0 w-full"
                  viewBox="0 0 200 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d="M 0 10 Q 50 0 100 10 Q 150 20 200 10"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                      <stop offset="0%" stopColor="#24B459" />
                      <stop offset="100%" stopColor="#63D68D" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
          </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative mx-auto max-w-[90%] text-base text-gray-600 dark:text-gray-300 sm:max-w-3xl sm:text-lg md:text-xl"
          >
            <span className="relative">
              Everything you need to manage your databases efficiently and
              securely,
              <br className="hidden md:block" /> all in one powerful platform.
            </span>
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.slice(0, 6).map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl border border-gray-100/50 bg-gradient-to-b from-gray-50/80 to-white/40 p-4 sm:p-6 lg:p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-[#24B459]/30 dark:border-gray-700/50 dark:from-[#232936]/80 dark:to-[#1e2330]/40 ${
                index === 0
                  ? "sm:row-span-2"
                  : index === 5
                  ? "col-span-1 sm:col-span-2 lg:col-span-3"
                  : ""
              } min-h-[250px] sm:min-h-[300px]`}
            >
              {/* Animated Background SVG */}
              <AnimatedBackground index={index} />

              {/* Hover Effect Background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#24B459]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/5" />
              
              {/* Content */}
              <div className="relative z-10 flex h-full flex-col">
                {/* Icon Container */}
                <div className="relative mb-4 sm:mb-6">
                  {/* Icon Background */}
                  <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-[#24B459]/20 to-[#63D68D]/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Icon Wrapper */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#24B459]/10 to-[#63D68D]/10 text-[#24B459] transition-colors duration-300 group-hover:from-[#24B459]/20 group-hover:to-[#63D68D]/20"
                  >
                    <div className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7">{feature.icon}</div>
                  </motion.div>
                </div>
                
                {/* Title */}
                <h3 className="mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-lg sm:text-xl font-semibold text-transparent transition-colors duration-300 group-hover:from-[#24B459] group-hover:to-[#63D68D] dark:from-white dark:to-gray-300">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute right-0 top-0 h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute right-0 top-0 h-full w-full rounded-tr-2xl bg-gradient-to-bl from-[#24B459]/10" />
              </div>

              {/* Bottom Decorative Line */}
              <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent via-[#24B459]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 
