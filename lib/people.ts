/**
 * CSI people — staff, board of directors, and the Strategic Advisory
 * Council. Names, roles and bios are verbatim from the 2026-07-27 crawl of
 * the institute's roster and bio pages (handoff/content/staff__*.md,
 * council__*.md). Bios were extracted programmatically; the only edit is
 * stripping a raw pasted Notion URL from one bio.
 *
 * Three roster titles contradict the person's own bio (Natilie McCallick,
 * Candy Alexander, Dr. Calvin Nobles — see INSTITUTE-CONTENT-SPEC.md §08).
 * The roster titles are used here; resolving the contradiction is a client
 * decision, deliberately not guessed.
 */

export type PersonGroup = "staff" | "board" | "council";

export interface Person {
  slug: string;
  name: string;
  role: string;
  group: PersonGroup;
  portrait: string;
  portraitWidth: number;
  portraitHeight: number;
  linkedin: string | null;
  /** Personal/professional site where the bio page links one (the source
      labels every social slot "LinkedIn" regardless of destination). */
  website: string | null;
  /** Verbatim paragraphs from the bio page. */
  bio: string[];
}

export const personGroups: { id: PersonGroup; label: string }[] = [
  { id: "staff", label: "Staff" },
  { id: "board", label: "Board of Directors" },
  { id: "council", label: "Strategic Advisory Council" },
];

export const people: Person[] = [
  {
    slug: "matthew-canham",
    name: "Dr. Matthew Canham",
    role: "Executive Director",
    group: "staff",
    portrait: "/assets/people/matthew-canham.webp",
    portraitWidth: 640,
    portraitHeight: 640,
    linkedin: "https://www.linkedin.com/in/matthew-cognitivesecurity/",
    website: "https://www.canham.ai/",
    bio: [
      "Dr. Matthew Canham is the Executive Director of the Cognitive Security Institute and a former Supervisory Special Agent with the Federal Bureau of Investigation (FBI). He has a combined twenty-one years of experience conducting research in cognitive security and human-technology integration. His research focuses on the cognitive factors in synthetic media social engineering and online influence campaigns. He was previously a research professor with the University of Central Florida's Behavioral Cybersecurity program (in the School of Modeling, Simulation, and Training). His work has been funded by NIST (National Institute of Standards and Technology), DARPA (Defense Advanced Research Projects Agency), and the US Army Research Institute. He has provided cognitive security awareness training to the NASA Kennedy Space Center, DARPA, MIT, the NATO Cognitive Warfare Working Group, the Voting and Misinformation Villages at DefCon, and the Black Hat USA security conference. He holds a PhD in Cognition, Perception, and Cognitive Neuroscience from the University of California, Santa Barbara, and SANS certifications in mobile device analysis (GMOB), security auditing of wireless networks (GAWN), digital forensic examination (GCFE), and GIAC Security Essentials (GSEC).",
    ],
  },
  {
    slug: "winn-schwartau",
    name: "Winn Schwartau",
    role: "Director of Special Projects",
    group: "staff",
    portrait: "/assets/people/winn-schwartau.webp",
    portraitWidth: 640,
    portraitHeight: 640,
    linkedin: "https://www.linkedin.com/in/winnschwartau/",
    website: "https://www.winnschwartau.com/",
    bio: [
      "The Civilian Architect of Information Warfare \- Commodore Pat Tyrrell OBE Royal Navy, 1996",
      "Electronic Pearl Harbor Prophet \- BankInfo Security, 2023",
      "We are defenseless. - The Art & Science of Metawar, 2024",
      "Winn has lived Cybersecurity since 1983, and now says, “I think, maybe, I’m just starting to understand it.” His predictions about the internet & security have been scarily spot on. He coined “Electronic Pearl Harbor” while testifying before Congress in 1991. His seminal book, “Information Warfare,” showed the world how privacy would die and cyber-terrorism would be an integral part of the future (today’s present). His new book, \"The Art & Science of Metawar,” describes how to defend against AI-driven reality distortion, TMI/disinformation, manipulation, and algorithmic addictions by strengthening the mental immune system. Increasingly impressive immersive technologies, active metacontent orchestration, and powerful feedback systems (OODA loops) exploit information overload and disseminate disinformation through believable online experiences. We are approaching the metapoint, where persistent immersive simulations will be indistinguishable from our default ‘reality.’ The security, privacy, ethics, and global policy implications are staggering.",
      "His last book, “Analogue Network Security” is a time-based approach to justifiable security. “It will twist your mind.” “The Best Cybersecurity Book of All Time,” Cyber Defense Magazine. · Fellow, Royal Society of the Arts · Distinguished Fellow: Ponemon Institute · International Security Hall of Fame: ISSA · Lifetime Achievement Award, DefCon XXXI · Top-20 industry pioneers: SC Magazine. · Top 25 Most Influential: Security Magazine · Top 5 Security Thinkers: SC Magazine. · Power Thinker and one of the 50 most powerful people: Network World. · 30 Year DefCon Goon (Ret.) · Top Rated (4.85/5) RSA Speaker · Top Rated Webinar: 4.56 (ISC2) · .001% Top Influencer RSAC · Global Power Speaker · US Patent: 11,438,369 (Time-Based Security) Author: “Time-Based Security,” “Pearl Harbor Dot Com” (Die Hard IV), the world’s first novel-on-the-net 1993, Project Gutenberg), 3 volumes of “Information Warfare”, “CyberShock”, “Internet and Computer Ethics for Kids” (The Best Security Book Ever Written, Dr. Fred Cohen) and a few more. Publisher: Weapons of Mass Destruction Terrorism, James K. Campbell ISBN: 0-962-8700-3-X, 1977 The Mind of the Hacker, Dr. Nick Chandler (Maj. Australian military intelligence) 1999 Executive Producer: “Hackers Are People Too”, “VR Babies in the Metaverse” premiered at the Getty in Oct. 2024.",
    ],
  },
  {
    slug: "leah-von-kreman",
    name: "Leah Von Kreman",
    role: "Volunteer Coordinator",
    group: "staff",
    portrait: "/assets/people/leah-von-kreman.webp",
    portraitWidth: 640,
    portraitHeight: 640,
    linkedin: "https://www.linkedin.com/in/leah-von-kreman/",
    website: null,
    bio: [
      "Leah Von Kreman holds a Master’s in Business Administration with a focus in Human Resources Management and brings experience spanning talent strategy, people analytics, and organizational operations across both startup and corporate environments. Her interests sit at the intersection of human behavior, technology, and emerging risk. She is particularly motivated by efforts that strengthen awareness, adaptability, and critical thinking in complex environments. Outside of work, Leah runs a small backyard egg operation, and can often be found combing Florida’s beaches and creek beds for fossils, happily trading spreadsheets for shark teeth and sunshine.",
    ],
  },
  {
    slug: "k-melton",
    name: "K. Melton",
    role: "Director of Community Events & Programs",
    group: "staff",
    portrait: "/assets/people/k-melton.webp",
    portraitWidth: 640,
    portraitHeight: 640,
    linkedin: "https://www.linkedin.com/in/k-melt/",
    website: "https://www.realitycheck42.com/",
    bio: [
      "K. Melton is a strategist, community advocate, and experiential architect working at the frontier of cognitive defense, cybersecurity, and innovation ecosystems. For more than 15 years, their work has focused on the macro effects of these domains on human resilience and on designing environments where complex ideas translate into meaningful collective action.",
      "K. joined the Cognitive Security Institute in 2024 to provide operational leadership during a period of hypergrowth, developing and stabilizing internal systems that strengthened the organization’s foundation. Now serving as Director of Community Events & Programs, they lead the design of scalable, mission-aligned programs that expand CSI’s influence and deepen its community impact. Their portfolio includes innovative conferences, workshops, and strategic experiences that bring together researchers, practitioners, students, and industry leaders to address the evolving landscape of cognitive security.",
      "This work builds on a long track record of architecting high-impact gatherings that catalyze cross-disciplinary collaboration. In the mid-2010s, K. joined InfoWarCon to help revive it, leading brand direction, shaping its strategic positioning, and facilitating its evolution into the modern era. The revival led to several years of high-level summits that shaped conversations in information warfare and global defense strategy.",
      "In the early 2020s, while serving as a VP at KnowBe4, K. conceived and built the company’s internal Innovation Summit from the ground up. They designed a cross-level, cross-functional collaboration model that intentionally created structured creative friction among unlikely voices. The initiative culminated in a comprehensive executive report synthesizing global insights and strategic recommendations, earning K. the Innovator of the Year award in 2022. The summit continues today as a core innovation vehicle.",
      "A long-time contributor to hacker and infosec communities, K. bridges technical depth with visionary strategy. They are known for identifying latent potential, building high-performance teams, and cultivating environments where unconventional thinkers, n00bs, executives, and operators can collaborate with rigor and trust.",
      "K’s work centers on protecting the intangible spark that makes strategic events truly catalytic: psychological safety, intellectual intensity, personal validation, and intentional cross-pollination. Whether reviving legacy institutions or designing new platforms from scratch, they operate as a steward of the human element within complex technical systems.",
    ],
  },
  {
    slug: "holly-jane-grayling",
    name: "Holly-Jane Grayling",
    role: "Director of SHIELD (Security & Human Insight for Educating Leaders on Defence)",
    group: "staff",
    portrait: "/assets/people/holly-jane-grayling.webp",
    portraitWidth: 640,
    portraitHeight: 640,
    linkedin: "https://www.linkedin.com/in/hjgrayling/",
    website: null,
    bio: [
      "A curious nerd with a fascination for humans, a love of data, and over a decade of experience in learning and behaviour change, with six of those in cyber security, focused on understanding not just what people do, but why.",
      "By day, leads security awareness and culture for a global organisation, turning insight into practical interventions that genuinely shift behaviour. Combines behavioural science, data, and creativity to design everything from engaging content to simulations and immersive exercises. Also strengthens the systems behind the scenes, refining policies, improving processes, supporting incident response, and closing gaps wherever they appear. A regular public and corporate speaker who enjoys hosting sessions for a variety of audiences, including senior leaders, covering topics from social engineering to mitigating cognitive drift in the age of AI.",
      "By night, manages the Cognitive Security Institute’s SHIELD community (Security and Human Insight for Educating Leaders on Defence), shaping thinking around human centric security. Passionate about learning and sharing information with others. Drawn to the edges of human understanding, exploring consciousness, UAPs and extraordinary human experiences to better understand the nature of reality and perception. Also spends a suspicious amount of time outside collecting rocks, bones and bits of nature.",
    ],
  },
  {
    slug: "royce-j-porter",
    name: "Royce J. Porter",
    role: "Security Researcher",
    group: "staff",
    portrait: "/assets/people/royce-j-porter.webp",
    portraitWidth: 640,
    portraitHeight: 640,
    linkedin: null,
    website: null,
    bio: [
      "Royce J. Porter is a U.S. Army veteran and independent researcher focused on cognitive security, social engineering detection, and adversarial manipulation of human and AI decision systems. His work explores how psychological influence techniques, deception strategies, and AI exploitation methods can be modeled and detected as part of defensive cyber operations.",
      "He is currently developing CATSCAN (Cognitive Attack Taxonomy Scanner), a research platform designed to operationalize the Cognitive Attack Taxonomy (CAT) developed by Dr. Matthew Canham. CATSCAN analyzes digital communications and AI prompts to identify cognitive attack patterns, including phishing, social engineering, disinformation, and prompt injection.",
      "The system combines persuasion signal detection and structural pattern analysis to identify manipulation strategies and map them to security frameworks such as MITRE ATT&CK and MITRE ATLAS.",
      "His research interests include cognitive warfare, human-machine teaming in cyber defense, and the development of tools that improve detection of influence operations and AI manipulation attempts in modern hybrid threat environments.",
    ],
  },
  {
    slug: "anna-varfolomeeva",
    name: "Anna Varfolomeeva",
    role: "Director of Communications",
    group: "staff",
    portrait: "/assets/people/anna-varfolomeeva.webp",
    portraitWidth: 640,
    portraitHeight: 640,
    linkedin: "https://www.linkedin.com/in/anna-varf/",
    website: null,
    bio: [
      "Anna Varfolomeeva has spent over a decade trying to answer one question: how does information actually work on people? That curiosity has taken her from breaking news reporting to managing newsrooms, from analyzing state propaganda to studying the cognitive mechanisms that make manipulation possible in the first place.",
      "A native Russian speaker with professional Mandarin, Anna has reported from inside Russian- and Chinese-language information environments that most Western analysts access only in translation. That proximity shaped her understanding of how narratives are built and why they land.",
      "At CSI, Anna leads communications — from internal strategy and organizational voice to external outreach that connects the institute's research with the audiences that need it most.",
      "She believes the most important thing cognitive security can do right now is make itself legible, because the people who most need to understand how they're being manipulated are rarely reading academic papers.",
    ],
  },
  {
    slug: "sarah-fuller",
    name: "Sarah Fuller",
    role: "Senior Advisor - Strategy",
    group: "staff",
    portrait: "/assets/people/sarah-fuller.webp",
    portraitWidth: 640,
    portraitHeight: 640,
    linkedin: "https://www.linkedin.com/in/sfullerfuller/",
    website: null,
    bio: [
      "Sarah Fuller is an experienced security professional with years of experience in incident response and customer service environments. She transitioned her career to security in 2021, starting as a SOC intern for a global non-profit and hit \"full send\". In the past 4 years Sarah slogged through the SOC, working on everything from incident response to detection engineering, and mentorship to designing onboarding programs. When Sarah's not working, she's working. In 2022 she co-founded BSides Bloomington in Indiana, and is also a mother to three enthusiastic little boys (send help!). The most important thing to know about Sarah is that she cares about people and loves the work that we do as security professionals. Despite whatever title she has, Sarah treats every day as an opportunity to lift up the people around her and contribute in ways that make it easier for others to do their best. Our field is in an exciting place right now, and she's grateful to be part of it.",
    ],
  },
  {
    slug: "natilie-mccallick",
    name: "Natilie McCallick",
    role: "Administrative Assistant",
    group: "staff",
    portrait: "/assets/people/natilie-mccallick.webp",
    portraitWidth: 426,
    portraitHeight: 488,
    linkedin: "https://www.linkedin.com/in/natilie-mccallick-96689a235/",
    website: null,
    bio: [
      "Natilie McCallick holds a Bachelor’s degree in Cybersecurity Management from York College of Pennsylvania and is currently the Director of Operations at the Cognitive Security Institute.",
      "During her academic career, Natilie made significant contributions to the cybersecurity field through various roles. She served as an illustrator and researcher for the textbook Information Warfare by Tamara Schwartz, delivered a keynote presentation for the Project Management Institute, and held the role of Vice President for the Order of the Sword and Shield. These experiences have highlighted her expertise and leadership within the cybersecurity sector.",
      "In the banking industry, Natilie was responsible for overseeing Cloud Financial Operations during cloud migration initiatives.",
      "Though early in her career, Natilie is dedicated to bridging the gap between theory and practice through innovative and effective communication strategies.",
    ],
  },
  {
    slug: "ben-d-sawyer",
    name: "Dr. Ben D. Sawyer",
    role: "Board Chair",
    group: "board",
    portrait: "/assets/people/ben-d-sawyer.webp",
    portraitWidth: 640,
    portraitHeight: 640,
    linkedin: "https://www.linkedin.com/in/bendsawyer/",
    website: "https://www.bendsawyer.com/",
    bio: [
      "Dr. Ben D. Sawyer is an applied neuroscientist and human factors engineer fascinated by information exchange between human and machine. Brainwaves, biosignals, and mathematical theory help Dr. Sawyer and his teams to design the models and algorithms that power trustworthy machines. Dr. Sawyer’s math, research, and design recommendations are leveraged by Fortune 500 companies, governments, and nonprofits. His work has been covered by The Washington Post, The New York Times, Forbes, Reuters, Fast Company, The BBC, and more.",
    ],
  },
  {
    slug: "tamara-schwartz",
    name: "Dr. Tamara Schwartz",
    role: "Board Member",
    group: "board",
    portrait: "/assets/people/tamara-schwartz.webp",
    portraitWidth: 640,
    portraitHeight: 640,
    linkedin: "https://www.linkedin.com/in/tamara-schwartz-a8b27412/",
    website: null,
    bio: [
      "Dr. Tamara Schwartz, USAF (ret.), is an Associate Professor of Cybersecurity and Strategy at the York College of Pennsylvania, and an affiliate researcher with Cybersecurity at MIT-Sloan Interdisciplinary Consortium for Improving Critical Infrastructure Cybersecurity, an international cybersecurity think tank. While on active duty, Dr. Schwartz’s thought leadership informed the standup of Cyber Command and the design of various command centers supporting Joint Space, Cyber, and Global Strategic Operations, and her work at the U.S. Embassy in Amman, Jordan earned her the 2011 Information Operations Officer of the Year. More recently, Dr. Schwartz was a member of the 2020 “Dr. Evil task force,” with the Defense Threat Reduction Agency, identifying future threats to inform DoD investments in emerging technology. She received her B.S. in Industrial Engineering from Rensselaer Polytechnic Institute, her M.S. in Engineering Management from the University of Dayton, and her Doctorate of Business Administration from the Fox School of Business, Temple University. Her research expertise includes Artificial Intelligence, cybersecurity as a strategic competitive advantage, and information warfare.",
    ],
  },
  {
    slug: "robert-thomson",
    name: "Dr. Robert Thomson",
    role: "Board Member",
    group: "board",
    portrait: "/assets/people/robert-thomson.webp",
    portraitWidth: 640,
    portraitHeight: 640,
    linkedin: "https://www.linkedin.com/in/robert-h-thomson/",
    website: "https://scholar.google.com/citations?user=z4qHMOYAAAAJ&hl=en",
    bio: [
      "Dr. Thomson has over 12 years of post-graduate research experience and over 75 invited and refereed academic publications in the domains of computational modeling, intelligence analysis, cybersecurity, and artificial intelligence. He has been selected and supported more than $25M in reimbursable research from IARPA, DARPA, NIH, the Office of Naval Research, and several Army organizations.",
    ],
  },
  {
    slug: "adam-beal",
    name: "Adam Beal",
    role: "Scientist, Entrepreneur, Venture Capitalist, Corporate Strategist",
    group: "council",
    portrait: "/assets/people/adam-beal.webp",
    portraitWidth: 640,
    portraitHeight: 602,
    linkedin: "https://www.linkedin.com/in/adammbeal/",
    website: "https://clarity.fm/adammbeal",
    bio: [
      "Adam M. Beal is a scientist, entrepreneur, venture capitalist and corporate strategist. He excels at the intersection of emerging technologies, capital and opportunity. Previously, he founded two companies, including an award-winning dual-use artificial intelligence startup, led strategic initiatives at General Motors, and managed strategic investments for Honda. Adam helped launch the Air Force Accelerator, and as a founder he completed the MassChallenge, gener8tor and Catalyst Space accelerator programs. He is currently an investor at R3i Ventures and a mentor at National Security Innovation Network and the New England lead for Defense Entrepreneurs Forum.",
    ],
  },
  {
    slug: "calvin-nobles",
    name: "Dr. Calvin Nobles",
    role: "Dean, School of Cybersecurity & IT, UMD",
    group: "council",
    portrait: "/assets/people/calvin-nobles.webp",
    portraitWidth: 636,
    portraitHeight: 640,
    linkedin: "https://www.linkedin.com/in/calvinnobles",
    website: null,
    bio: [
      "Dr. Calvin Nobles is a distinguished cybersecurity leader and human factors engineer with over 25 years of experience spanning military, corporate, and academic sectors. He serves as Portfolio Vice President and Dean of the School of Cybersecurity and Information Technology at the University of Maryland Global Campus (UMGC), a role he assumed in January 2024. His career includes roles such as Senior Director of Cyber Support Operations for the U.S. Fleet Cyber Command and Vice President of Identity and Access Management at Wells Fargo.",
      "In academia, he has served as Department Chair and Associate Professor at Illinois Institute of Technology's College of Computing. He holds a Doctorate in Business Administration from Temple University and PhDs in Human Factors and Offensive Cyber Engineering from Capitol Technology University. His research focuses on integrating human factors into cybersecurity practices to reduce human error and enhance system resilience.",
      "In February 2025, Dr. Nobles was appointed Chair of the Cybersecurity Technical Group at the Human Factors and Ergonomics Society (HFES), promoting human-centered approaches in cybersecurity. His work influences strategies that account for human behavior and ergonomics.",
    ],
  },
  {
    slug: "sean-guillory",
    name: "Dr. Sean Guillory",
    role: "Board Member, Information Professionals Association",
    group: "council",
    portrait: "/assets/people/sean-guillory.webp",
    portraitWidth: 640,
    portraitHeight: 602,
    linkedin: "https://www.linkedin.com/in/sean-guillory-cog-neuro/",
    website: "https://www.madwarfare.com/",
    bio: [
      "Sean Guillory attained his Ph.D. in Cognitive Neuroscience from Dartmouth College where he primarily worked with neurosurgery patients to help improve the mapping for brain functions that were personally important to their lives. After taking that experience to help build up a start-up business incubator aimed at helping humanity (Fruition Tech Labs) and working on data science efforts to help catch online scammers (Consumer Affairs), he now focuses on ways of utilizing his background in automation, biometrics, and social science methodology to help with issues within Defense and National Security. Dr. Guillory is currently a Board of Director member for the Information Professionals Association, and a proud board member for the Mind Science Foundation’s Science Committee and Thematic Task Force lead for the National Science Foundation’s Engineering Research Visioning Alliance (ERVA).",
    ],
  },
  {
    slug: "sumona-banerji",
    name: "Sumona Banerji",
    role: "Cyber-Psychology Researcher; Founder of MindShield",
    group: "council",
    portrait: "/assets/people/sumona-banerji.webp",
    portraitWidth: 640,
    portraitHeight: 602,
    linkedin: "https://www.linkedin.com/in/sumona-banerji/",
    website: "https://www.mindshield.org/",
    bio: [
      "Sumona Banerji is a futurist, cyber-psychology researcher, and the founder of MindShield- an organization pioneering the field of Cognitive Security (CogSec), dedicated to establishing it as a vital vertical within cybersecurity for individual, organizational, and government protection. She began her journey as a documentary filmmaker, driven by the need to uncover complex narratives and protect those telling their stories. This led her to the realm of AI as a tool to gather testimonials while safeguarding individuals from surveillance— almost instantly sparking a deeper curiosity in how exponential technologies impact human behavior and wellbeing.",
      "She followed up on her curiosity with a Master of Design in Strategic Foresight and Innovation, where her thesis, “Future of Well-being: The Metaverse Era,” explored how emerging technologies shape human cognition, social behavior, and overall well-being. This laid the groundwork for her to identify emerging threats in cyberspace, particularly the psychological vulnerabilities that both individuals and organizations face.",
      "In 2023, Sumona founded MindShield to address these threats head-on. Her vision is to create a world where Cognitive Security is recognized as a fundamental component of cybersecurity strategies. MindShield's mission is to develop AI-based training solutions that strengthen mental resilience and cognitive defenses against digital manipulation, misinformation, and social engineering—key tactics used in cyber-attacks.",
      "Sumona aims to reshape how we think about cybersecurity, moving beyond traditional data protection to include the protection of the human mind. She continues to drive MindShield’s growth with a singular focus: to ensure that Cognitive Security becomes a key element of national security strategies, organizational defense protocols, and individual safety in the digital era.",
    ],
  },
  {
    slug: "alexandra-bruce",
    name: "Alexandra Bruce",
    role: "Assistant Vice President; Repeat Clicker Manager",
    group: "council",
    portrait: "/assets/people/alexandra-bruce.webp",
    portraitWidth: 640,
    portraitHeight: 602,
    linkedin: "https://www.linkedin.com/in/alexandralbruce/",
    website: null,
    bio: [
      "Alexandra Bruce is an Assistant Vice President and Repeat Clicker Manager at a leading financial institution, where she specializes in addressing and remediating click behaviors among repeat offenders. With a proven track record of collaborating with senior executives in the security space, she aligns security awareness initiatives with organizational goals, driving meaningful behavior change.",
      "Leveraging her background in psychology and experience in process improvement, Alexandra applies a unique, human-centered approach to cybersecurity. Her expertise in behavioral science enables her to design, implement, and evaluate interventions that mitigate human risk factors, enhancing organizational resilience. Passionate about fostering a culture of security mindfulness, she is committed to developing scalable solutions that empower employees and strengthen the organization’s overall cybersecurity posture.",
    ],
  },
  {
    slug: "gareth-doherty",
    name: "Dr. Gareth Doherty",
    role: "Strategic Management Expert",
    group: "council",
    portrait: "/assets/people/gareth-doherty.webp",
    portraitWidth: 640,
    portraitHeight: 602,
    linkedin: "https://www.linkedin.com/in/gdoherty/",
    website: "http://www.thinkable.solutions/",
    bio: [
      "Dr. Gareth Doherty M.S.M, is a strategic management expert with applied research and consultation experience from academia, private, and public sector organizations. He is a Meritorious Service Medal recipient (civil division) for his strategic work leading a health and wellness strategy as a civil servant in the Canadian Department of National Defence. He obtained his Ph.D. in philosophy and cognitive science from Western University and has 20+ years of research experience exploring topics at the intersection of social and cross-cultural differences in cognition, social cognition, the psychology of reasoning and decision making, artificial intelligence, and the foundations of cognitive science. His work in cognitive security is a fusion of passion for cognitive science and interest in security organizations.",
    ],
  },
  {
    slug: "oz-alashe",
    name: "Oz Alashe",
    role: "CEO and Founder, CybSafe",
    group: "council",
    portrait: "/assets/people/oz-alashe.webp",
    portraitWidth: 640,
    portraitHeight: 602,
    linkedin: "https://www.linkedin.com/in/oz-alashe-mbe-a8870785/",
    website: "https://www.cybsafe.com/",
    bio: [
      "Oz Alashe MBE is CEO and Founder at CybSafe, a behavioral science and data analytics company that builds cybersecurity software to better manage human risk. A former UK Special Forces Lieutenant Colonel, Oz is focused on making society more secure by helping organizations address the human aspect of cybersecurity.",
      "He has extensive experience and understanding in the areas of intelligence insight, complex human networks, and human cyber risk & resilience.",
      "He’s also passionate about reducing societal threats to stability and security by making the most of opportunities presented through advancements in technology.",
      "Oz was made an MBE in 2010 for his personal leadership in the most complex of conflict environments.",
      "Oz chairs the UK Government’s Cyber Resilience Expert Advisory Group for the Department of Science, Innovation and Technology. He also sits on the Advisory Board for the Research Institute in Sociotechnical Cyber Security (RISCS). He’s an Expert Fellow at The Security, Privacy, Identity and Trust Engagement NetworkPlus (SPRITE+), as well as the Royal United Services Institute (RUSI).",
    ],
  },
  {
    slug: "candy-alexander",
    name: "Candy Alexander",
    role: "Strategic AI Advisor; Independent Consultant",
    group: "council",
    portrait: "/assets/people/candy-alexander.webp",
    portraitWidth: 640,
    portraitHeight: 640,
    linkedin: "https://www.linkedin.com/in/candyalexander/",
    website: "https://alexander-advisory.com/",
    bio: [
      "Candy Alexander is the Chief Information Security Officer at NeuEon, where she leads cybersecurity initiatives to ensure robust protection and compliance across diverse client environments. With over 30 years of experience, Candy is a recognized thought leader in the cybersecurity field, known for her expertise in aligning cyber risk strategies with business objectives and regulatory frameworks.",
      "Her leadership fosters a culture of continuous improvement and innovation, empowering organizations to navigate evolving cyber threats with confidence. At NeuEon, Candy is instrumental in delivering executive-level cyber risk services that are tailored to meet each client’s unique challenges.",
      "Holding CISSP and CISM certifications, she brings a business-focused perspective to cybersecurity, blending technical expertise with practical, real-world insights. Candy’s work emphasizes proactive risk management, strategic leadership, and a commitment to excellence—ensuring that organizations are well-equipped to protect what matters most in",
      "today’s dynamic digital landscape.",
    ],
  },
  {
    slug: "rosanna-guadagno",
    name: "Dr. Rosanna Guadagno",
    role: "Assoc. Prof. of Persuasive Information Systems, University of Oulu",
    group: "council",
    portrait: "/assets/people/rosanna-guadagno.webp",
    portraitWidth: 640,
    portraitHeight: 602,
    linkedin: "https://www.linkedin.com/in/rosanna-guadagno-ph-d-9324661/",
    website: "https://beta.oulu.fi/en/researchers/rosanna-guadagno",
    bio: [
      "Dr. Rosanna Guadagno (Ph.D., Social Psychology, Arizona State University) is an Associate Professor of Persuasive Information Systems at the University of Oulu. She completed her postdoctoral work at UC Santa Barbara and has previously taught at University of Alabama, University of Texas at Dallas, University of California at Berkeley, and Stanford University. Dr. Guadagno is a former Program Director at the National Science Foundation managing three programs: Social Psychology; the Science of Learning Centers; and Secure and Trustworthy Cyberspace (SaTC) and directed the Information Warfare Working Group at the Center for International Security and Cooperation at Stanford University. Her research interests focus on Social Influence and Persuasion and Digital Media. Her work has been published in journals such as: Perspectives on Psychological Science, Psychological Inquiry, Personality and Social Psychology Bulletin, Computers in Human Behavior, Media Psychology, CyberPsychology, Behavior, & Social Networking, and Frontiers in Psychology; covered in the press by: CBS News, The New York Times, The Atlantic Monthly, The New Yorker, The Associated Press, The New Scientist, MSNBC, and Alabama Public Radio. Dr. Guadagno’s forthcoming book is entitled Psychological Processes in Social Media: Why We Click. She also serves as the Specialty Chief Editor in Media Psychology for Frontiers in Psychology.",
    ],
  },
  {
    slug: "perry-carpenter",
    name: "Perry Carpenter",
    role: "Chief Human Risk Management Strategist, KnowBe4",
    group: "council",
    portrait: "/assets/people/perry-carpenter.webp",
    portraitWidth: 640,
    portraitHeight: 602,
    linkedin: "https://www.linkedin.com/in/perrycarpenter/",
    website: "https://www.thedeceptionproject.com/",
    bio: [
      "Perry Carpenter is a multi-award-winning author, podcaster, and speaker with a lifelong fascination for both deception and technology. As a cybersecurity professional, human factors expert, and deception researcher, Perry has spent over two decades at the",
      "forefront of exploring how cybercriminals exploit human behavior.",
      "Perry's career has been a relentless pursuit of understanding how bad actors exploit human nature. His fascination for the art and science of deception began in childhood with magic tricks and mental manipulations, evolving into a mission to protect others",
      "from digital threats. As the Chief Human Risk Management Strategist at KnowBe4, Perry helps organizations and individuals build robust defenses against the ever-evolving landscape of online deceptions.",
      "In his latest book, FAIK: A Practical Guide to Living in a World of Deepfakes, Disinformation, and AI-Generated Deceptions (Wiley: Oct 2024), Perry tackles the fascinating and often daunting world of artificial intelligence. He explores AI's potential benefits and the darker side of its application in deception and misinformation. Through engaging storytelling and practical advice, Perry equips readers with the knowledge and tools needed to navigate the complexities of AI-driven deception. He demystifies complex concepts, making them accessible to a general audience while providing actionable strategies for protecting oneself in the digital age.",
      "Perry's contributions to the field are widely recognized. His first book, Transformational Security Awareness was inducted into the Cybersecurity Canon Hall of Fame. He also hosts two award winning podcasts, 8th Layer Insights and Digital Folklore, where he",
      "explores the intersection of technology and humanity in an entertaining and thought-provoking manner.",
      "Whether speaking on stage, writing, or podcasting, Perry empowers his audience to stay vigilant, think critically, and harness the power of technology responsibly. His work has not only educated but also inspired countless professionals and individuals to take proactive steps in safeguarding their digital lives and helping others do the same. As Perry often says, \"The fight against AI-driven deception won’t be won by technology alone. Our greatest weapon is exactly what bad actors are trying to exploit… it’s our humanity and our minds.\"",
    ],
  },
];
