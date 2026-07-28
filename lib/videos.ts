/**
 * The CSI YouTube channel row — a POINT-IN-TIME SNAPSHOT.
 *
 * The source Wix homepage renders this widget live: it always shows the 8
 * most recent uploads of @cognitivesecurityinstitute. This module freezes
 * the feed as captured on 2026-07-27 (handoff/port-research/videos.json)
 * and WILL GO STALE as the channel uploads. Static data is a deliberate
 * ship decision — no API key, no server route, the app stays 100% static.
 * Intended follow-up: a build-time refresh script (YouTube Data API,
 * 2 quota units per run) that regenerates this module in CI.
 *
 * Thumbnail URLs are carried verbatim from the capture, never constructed
 * by pattern: maxresdefault.jpg does NOT exist for every video (verified
 * HTTP 404 for the livestream U9axbn-GHMw). Where maxres is missing we
 * carry the hqdefault URL the capture verified instead.
 */

export const channel = {
  title: "Cognitive Security Institute",
  handleUrl: "https://www.youtube.com/@cognitivesecurityinstitute",
} as const;

export interface Video {
  videoId: string;
  title: string;
  /** null for the livestream — the source card omits the block entirely. */
  description: string | null;
  /** null for the livestream — never render an empty badge. */
  durationLabel: string | null;
  isLiveOrPremiere: boolean;
  publishedAt: string;
  watchUrl: string;
  /** Verbatim from the capture (maxres where it exists, else hqdefault). */
  thumbnail: string;
}

export const videos: Video[] = [
  {
    videoId: "XiFohPbeAlI",
    title: "What is the role of human factors in cybersecurity? Crystal Faucett, PhD CognectCon Tampa",
    description: "Dr. Crystal Faucett gives an overview of human factors as a science and describes its role in cybersecurity.",
    durationLabel: "01:08",
    isLiveOrPremiere: false,
    publishedAt: "2026-07-14T14:00:13Z",
    watchUrl: "https://www.youtube.com/watch?v=XiFohPbeAlI",
    thumbnail: "https://i.ytimg.com/vi/XiFohPbeAlI/maxresdefault.jpg",
  },
  {
    videoId: "Y9kDI35hyC4",
    title: "From Awareness to Accountability: Rethinking the Human Risk Practitioner's Role",
    description: "The job was never just \"run the phishing simulation.\" But the gap between what human risk practitioners were hired to do and what the business now needs from them has never been wider.\n\nIn this fireside chat, Holly-Jane Grayling sits down with Sanny Liao, co-founder of Fable Security and former Head of Data Science at Abnormal Security, and Jay Wilson, CISO at Insurity, to get into what that tension actually feels like from the inside. Where programs are struggling to keep up, where practitioners are finding unexpected leverage, and what it means to lead a function that the rest of the org is finally paying attention to.",
    durationLabel: "58:21",
    isLiveOrPremiere: false,
    publishedAt: "2026-07-14T08:28:57Z",
    watchUrl: "https://www.youtube.com/watch?v=Y9kDI35hyC4",
    thumbnail: "https://i.ytimg.com/vi/Y9kDI35hyC4/maxresdefault.jpg",
  },
  {
    videoId: "skitg5xpVGY",
    title: "Cybersecurity Social Dynamics: Attitudes, Influences, Usable Security | Dr. Cori Faklaris | CSI #59",
    description: "This talk explores how attitudes and social influences shape the adoption of security practices. Drawing on insights from the SA-6 and SA-13 security attitude scales and the Security and Privacy Acceptance Framework (SPAF), we will examine the factors that drive or hinder the voluntary adoption of cybersecurity measures. By understanding the role of social influences and user attitudes, we can design more effective and user-friendly security solutions. This presentation will highlight key findings from recent studies, including the impact of perceived usefulness and ease of use on security behavior, and discuss strategies to enhance user engagement and compliance. Join us to delve into the intersection of social science and cybersecurity, and discover how to foster a culture of security awareness and proactive behavior.\n\nBIO:\nDr. Cori Faklaris is a scholar in human-computer interaction and assistant professor at the University of North Carolina at Charlotte, where she directs the Security and Privacy Experiences (SPEX) research group. Her focus is on understanding how people's security attitudes and social environments weigh in their decision to adopt - or not adopt - secure behaviors (such as sharing passwords securely or ignoring UX cues to scams and \"fake news\"). She employs a mix of qualitative and quantitative methods from social science, computer science, and design. Her work also is informed by prior experiences as a journalist, IT/UX specialist, and social media manager. Dr. Faklaris received her Ph.D. in Human-Computer Interaction from Carnegie Mellon University in 2022. She has published at venues such as the USENIX Symposium on Usable Security and Privacy (SOUPS) and the ACM Conference on Computer-Supported Collaborative Work and Social Computing (CSCW). Among other accomplishments, she received a 2024 Google Research Scholar award for an AI-informed system to connect people with advice about their security and privacy concerns. Her work is also funded by BasisLabs LLC founder Carl Hoffman, the U.S. Army Research Lab, and the U.S. National Science Foundation.\n\n----------------------\n\nWe are a not-for-profit, if you would like to sponsor a CSI video, please complete the form at:\nhttps://www.cognitivesecurityinstitute.org/sponsor-video\n\nIf you would like to be added to our membership waitlist to join us for live meetings, please submit an application at: https://www.cognitivesecurityinstitute.org/apply",
    durationLabel: "44:37",
    isLiveOrPremiere: false,
    publishedAt: "2026-07-07T06:00:20Z",
    watchUrl: "https://www.youtube.com/watch?v=skitg5xpVGY",
    thumbnail: "https://i.ytimg.com/vi/skitg5xpVGY/maxresdefault.jpg",
  },
  {
    videoId: "bIGcM7W9Gqo",
    title: "Building Cognitive Defence for Organisations in the Age of AI w/ Holly-Jane Grayling & Andrew Beachy",
    description: "As AI becomes embedded into everyday work, the challenge is no longer just governing AI systems. It's protecting human judgement.\n\nIn this episode of SHIELD, Andrew Beachy explores the emerging concept of Cognitive Defence, examining why organisations must help people engage with AI critically, transparently, and safely. Using real-world examples, including Deloitte, Air Canada, and Zillow, he discusses how AI failures can influence human decision-making and why cognitive defence is becoming an essential organisational capability.\n\nBuilding on these concepts, Holly-Jane Grayling presents the CSI AI Cognitive Defence Framework for Organisations, introducing a practical, evidence-led framework being developed through SHIELD's Special Project Portfolio. The session explores the framework's foundations, core capabilities, implementation approach, measurement model, and a practical 90-day roadmap for organisations beginning their Cognitive Defence journey.\n\nIn this session you'll learn:\n\n* Why Cognitive Defence is emerging as a critical organisational capability\n* Lessons from real-world AI failures\n* How the CSI AI Cognitive Defence Framework is structured\n* The core capabilities organisations should develop\n* Practical steps for beginning to implement Cognitive Defence\n* How the framework will continue to evolve through research and community collaboration\n\nThe SHIELD Special Project Portfolio brings together researchers, practitioners, and industry experts to collaboratively develop practical guidance for AI Safe Use, Cognitive Defence, and emerging human-centred security challenges.\n\n🔗 Learn more about the Cognitive Security Institute's SHIELD Community: https://www.cognitivesecurityinstitute.org/shield or reach out to SHIELD Lead Holly-Jane Grayling\n\n#AISecurity #CognitiveDefense #CognitiveDefence #HumanRiskManagement #CyberSecurity #ArtificialIntelligence #SecurityCulture #AIGovernance #GRC #AI  #aisecurity #aigovernance",
    durationLabel: "21:15",
    isLiveOrPremiere: false,
    publishedAt: "2026-07-05T07:27:54Z",
    watchUrl: "https://www.youtube.com/watch?v=bIGcM7W9Gqo",
    thumbnail: "https://i.ytimg.com/vi/bIGcM7W9Gqo/maxresdefault.jpg",
  },
  {
    videoId: "pcNOBv9d1g0",
    title: "2024: A Cyborg Odyssey | Len Noe | CSI #60",
    description: "Transhumans, individuals enhanced with technological augmentations, have moved beyond science fiction into reality. Historically viewed through medical or cyborg lenses, recent advancements like Brain-Computer Interfaces (BCIs) and SMART technologies are blurring the lines between physical and biological entities. This shift is significantly impacting cybersecurity, as these augmented humans can execute sophisticated cyberattacks, such as URL redirections, phishing, smishing, and man-in-the-middle (MiTM) attacks, using embedded technologies. Traditional security measures are becoming inadequate in this new landscape, requiring a fundamental reassessment of cybersecurity strategies. The presentation will explore these emerging threats through demonstrations of implant-initiated attacks and emphasize the urgent need for advanced, layered security solutions to protect against the unique risks posed by transhumans.\n\nBIOGRAPHY:\nLen Noe is a Solutions Architect with BeyondTrust, specializing in offensive cybersecurity, biohacking, and the convergence of human cognition and machine interfaces. He is the bridge between human and machine identity in a single entity, known for pushing the boundaries of human-augmentation technologies while exploring the evolving intersection of cybersecurity, human-technology integration, and transhuman performance.\n\nLen is the subject of the documentary film “I AM MACHINE,” which premiered at DefCon 2025, offering a groundbreaking look into human-machine evolution and cyber-bio identity.\n\nA leading voice in the future of human-technology evolution and emerging threat landscapes, Len co-hosts The Cyber Cognition with Justin Hutch Hutchens, a podcast focused on futurism with an emphasis on AI, and co-hosts KillChain Radio with Bryon Hochkins-Noe, focused on attack methodology and current cyber threats. He hosts The Borg Radio Hour, which explores the integration of technology into the human condition and the human evolutionary path.\n\nLen is a global speaker who has presented in over 75 countries, with his research featured in major publications around the world. He is also the author of Human Hacked: My Life and Lessons as the World’s First Augmented Ethical Hacker. His expertise spans offensive security research, red-team operations, and global technical demonstrations. He is known for his visionary perspective, insight-driven approach, and immersive, high-impact presentations on the future of cyber-physical evolution and ethical security innovation.\n\n----------------------\n\nWe are a not-for-profit, if you would like to sponsor a CSI video, please complete the form at:\nhttps://www.cognitivesecurityinstitute.org/sponsor-video\n\nIf you would like to be added to our membership waitlist to join us for live meetings, please submit an application at: https://www.cognitivesecurityinstitute.org/apply",
    durationLabel: "45:48",
    isLiveOrPremiere: false,
    publishedAt: "2026-06-30T07:00:26Z",
    watchUrl: "https://www.youtube.com/watch?v=pcNOBv9d1g0",
    thumbnail: "https://i.ytimg.com/vi/pcNOBv9d1g0/maxresdefault.jpg",
  },
  {
    videoId: "U9axbn-GHMw",
    title: "Cognitive Security Institute Live Stream",
    description: null,
    durationLabel: null,
    isLiveOrPremiere: true,
    publishedAt: "2026-06-25T14:38:25Z",
    watchUrl: "https://www.youtube.com/watch?v=U9axbn-GHMw",
    thumbnail: "https://i.ytimg.com/vi/U9axbn-GHMw/hqdefault.jpg",
  },
  {
    videoId: "RzqdVmZlMqo",
    title: "The Mind of the Machine: Governing the New Agentic Workforce | Josh Devon | CSI #87",
    description: "The enterprise is deploying a new, non-human workforce of AI agents, but our security stack is architecturally blind to their unpredictable, human-like behavior. This session deconstructs this critical governance gap, revealing how core security functions like attribution, observability, and data protection break in the agentic era. Attendees will learn a new playbook, modeled on human resource governance, for managing this autonomous workforce and ensuring its \"mind\" aligns with enterprise intent.\n\nBIOGRAPHY:\nJosh Devon is a security entrepreneur with a career built at the intersection of intelligence and technology. He began his career in counterterrorism before co-founding and serving as COO of Flashpoint, a global leader in threat intelligence. The explosion of GenAI led him to explore early applications of this new technology and see both its promise and risk. As the co-founder and CEO of Sondera, he is now building a new generation of solutions to ensure AI agents operate safely and follow the rules.\n\n----------------------\n\nWe are a not-for-profit, if you would like to sponsor a CSI video, please complete the form at:\nhttps://www.cognitivesecurityinstitute.org/sponsor-video\n\nIf you would like to be added to our membership waitlist to join us for live meetings, please submit an application at: https://www.cognitivesecurityinstitute.org/apply",
    durationLabel: "31:43",
    isLiveOrPremiere: false,
    publishedAt: "2026-06-23T13:30:24Z",
    watchUrl: "https://www.youtube.com/watch?v=RzqdVmZlMqo",
    thumbnail: "https://i.ytimg.com/vi/RzqdVmZlMqo/maxresdefault.jpg",
  },
  {
    videoId: "IBccwAI8OTI",
    title: "Beyond Click Rates: Rethinking Phishing Awareness w/ James Phillips",
    description: "James Phillips introduces his proposed measurement approach for assessing phishing awareness saturation over time.\n\nRather than treating click rates and report rates as standalone success measures, James explores how organisations can look at behavioural stabilisation, recognition patterns, reporting trends, and awareness saturation across comparable phishing scenarios.\n\nThe session also introduces the Awareness Saturation Index (ASI), a calculation designed to help assess whether phishing awareness activity is continuing to create meaningful change, or whether results are beginning to plateau.\n\nThis session is useful for security awareness, human risk, and cyber security culture professionals who want to think more critically about phishing metrics, measurement maturity, and the limits of traditional training effectiveness reporting.\n\nJOIN OUR LINKEDIN COMMUNITY!\nhttps://www.linkedin.com/groups/18699026/",
    durationLabel: "18:30",
    isLiveOrPremiere: false,
    publishedAt: "2026-06-20T06:31:14Z",
    watchUrl: "https://www.youtube.com/watch?v=IBccwAI8OTI",
    thumbnail: "https://i.ytimg.com/vi/IBccwAI8OTI/maxresdefault.jpg",
  },
];
