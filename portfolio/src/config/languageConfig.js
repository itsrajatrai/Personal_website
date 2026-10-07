// Language Configuration
export const LANGUAGES = {
  en: {
    name: 'English',
    code: 'en',
    script: 'Latin',
    flag: '🇺🇸'
  },
  hi: {
    name: 'हिन्दी',
    code: 'hi',
    script: 'Devanagari',
    flag: '🇮🇳'
  },
  bh: {
    name: 'भोजपुरी',
    code: 'bh',
    script: 'Devanagari',
    flag: '🇮🇳'
  }
}

// Translations
export const TRANSLATIONS = {
  en: {
    // Page Titles
    pageTitles: {
      home: 'Rajat Rai',
      about: 'Rajat Rai - About',
      blog: 'Rajat Rai - Writing',
      talks: 'Rajat Rai - Talks & Judging',
      studio: 'Rajat Rai - Studio',
      certifications: 'Rajat Rai - Certifications',
      work: 'Rajat Rai - Work'
    },
    
    common: {
      emailMe: 'Email me',
      loading: 'Loading…'
    },

    home: {
      eyebrow: 'Software Engineer at Red Hat • builder • long-term thinker',
      greeting: 'Hi, I’m Rajat.',
      tagline: 'I build quiet, reliable software.',
      intro: 'I work on production infrastructure at Red Hat. On the side, I build tools, a programming language, and this site.',
      readNotes: 'Read my notes',
      seeWork: 'See selected work',
      recentWriting: 'RECENT WRITING',
      viewAll: 'View all',
      noPosts: 'No posts yet.',
      tech: 'Tech',
      nonTech: 'Non-Tech',
      philosophyTitle: 'PHILOSOPHY',
      philosophy: [
        'Clarity is a design choice. So is confusion.',
        'Most “complexity” is unpaid debt with good PR.',
        'Good systems don’t rely on heroics; they make the right thing the easy thing.',
        'Good software doesn’t have to shout. It just has to work, beautifully.',
        'Leverage isn’t doing more—it’s choosing constraints that do the work for you.',
        'If you can’t explain the trade-off, you don’t understand the decision.',
        'Dharma, in engineering, looks like clean incentives and honest boundaries.',
        'Companies that try to replace humans will fail. The ones that augment them will win.',
        'Family is everything. Every other institution is built on it.'
      ],
      workTitle: 'WORK',
      workSubtitle: 'Production infrastructure at Red Hat, and the things I build on the side.',
      workHighlights: [
        ['Edge infrastructure', 'Leading the Terraform migration of 35 Akamai properties, including access.redhat.com.'],
        ['Delivery', 'GitLab CI/CD with Argo CD GitOps and on-demand preview environments, adopted across 15+ projects.'],
        ['Production', 'On-call for production infrastructure, and running a Drupal platform on AWS with Helm and Prometheus.'],
        ['On the side', 'AuxiVault, a one-click knowledge stash, and KALPA, a programming language inspired by Sanskrit.']
      ],
      seeProjects: 'See projects',
      thoughtsTitle: 'THOUGHTS',
      thoughtsSubtitle: 'Short notes on systems, leverage, technology, and living well.',
      thoughts: [
        'The best architecture is the one that makes the next change cheap.',
        'Incentives are upstream of culture. Culture is downstream of incentives.',
        'A system is what remains after you remove the people doing extra work.',
        '“Scale” is usually just unpriced coupling.',
        'Stability comes from boundaries, not optimism.',
        'Time is a design constraint; treat it like memory or CPU.',
        'The skill isn’t speed. It’s knowing what to ignore.',
        'Tools don’t create leverage—taste does.',
        'Dharma is doing the right thing when nobody is watching; engineering is the same.',
        'Geopolitics is systems design with slower clocks and higher stakes.'
      ],
      subscribe: 'Subscribe / read longer notes',
      proofTitle: 'PROOF',
      proof: [
        ['Red Hat', 'since 2022, from intern to Software Engineer.'],
        ['Speaking', 'DevOps Con Singapore, Humanity 2026 by Bugbar, and colleges. Next: PIET, October 2026.'],
        ['Judging', 'six hackathons as a judge or mentor, including one at WWF India.'],
        ['Beyond code', 'singing, cooking, and classical Indian languages.']
      ],
      seeTalks: 'See talks & judging',
      actionTitle: 'ACTION',
      actionText: 'If you’re building something serious, send the hard problem. Or invite me to speak or judge.'
    },

    about: {
      eyebrow: 'Software Engineer at Red Hat',
      title: 'About',
      subtitle: 'A short map of what I care about: systems, constraints, and the long game.',
      aboutTitle: 'ABOUT',
      aboutItems: [
        'I’m Rajat Rai. I build systems that are easier to operate than to explain.',
        'I care about reliability, clear interfaces, and decisions that survive time.',
        'I’m drawn to problems where incentives, constraints, and feedback loops matter more than raw code.',
        'I learn by reading, writing, and building.'
      ],
      redHat: 'I’ve been at Red Hat since 2022, from intern to Software Engineer, working on production infrastructure, edge delivery and CI/CD.',
      seeWork: 'See my work',
      closing: 'I’m on a slow but steady transformation journey, as an engineer and as a human being.',
      interestsTitle: 'INTERESTS',
      interests: [
        'Systems thinking (how things actually behave, not how they’re described).',
        'Technology as leverage—especially tooling that reduces cognitive load.',
        'Dharma and discipline: doing the right thing when it’s inconvenient.',
        'Geopolitics and history: long time horizons, real trade-offs.',
        'Singing, cooking, and studying languages, especially classical Indian ones.'
      ],
      skillsTitle: 'TECHNICAL SKILLS',
      skillLabels: ['Infrastructure & Cloud', 'CI/CD & GitOps', 'Observability & Security', 'Languages', 'Backend', 'Databases', 'Frontend', 'AI & Data'],
      philosophyTitle: 'PHILOSOPHY',
      philosophy: [
        'Clarity is a feature. Complexity is a cost.',
        'A good system makes the correct action the easiest action.',
        'Write decisions down. The system should have a memory.',
        'Good software doesn’t have to shout. It just has to work, beautifully.',
        'Companies that try to replace humans will fail. The ones that augment them will win.',
        'Family is everything. Every other institution is built on it.'
      ],
      booksTitle: 'BOOKS / IDEAS I RETURN TO',
      books: [
        'Stoicism, Indian philosophy, and first-principles thinking.',
        'History as pattern recognition: incentives, geography, institutions.',
        'Writing as compression: keep only what’s true and useful.'
      ],
      likesTitle: 'THINGS I LIKE',
      likes: [
        'Simple interfaces.',
        'Quiet tools that respect attention.',
        'Maps, timelines, and first-hand sources.',
        'Good food. Good silence. Good work.'
      ]
    },
    
    // Blog Section
    blog: {
      title: 'Writing',
      subtitle: 'Notes on systems, technology, leverage, and life',
      techPosts: 'Tech Posts',
      nonTechPosts: 'Non-Tech Posts',
      comingSoon: 'Coming Soon',
      comingSoonDesc: 'blog posts will be available here soon!',
      readMore: 'Read more',
      loading: 'Loading blog posts...',
      error: 'Error Loading Posts',
      tryAgain: 'Try Again'
    },

    talks: {
      title: 'Talks & Judging',
      subtitle: 'Conference talks, university sessions, and hackathons I’ve judged or mentored, on systems, AI, and engineering leverage.',
      upcoming: 'UPCOMING',
      past: 'TALKS',
      comingSoon: 'Coming soon',
      talk: 'Talk',
      roles: { Judge: 'Judge', Mentor: 'Mentor' },
      judgingTitle: 'JUDGING / MENTORING',
      judgingIntro: 'I judge and mentor hackathons, looking for systems thinking, engineering quality, and clarity of trade-offs.',
      inviteTitle: 'INVITE',
      inviteText: 'If you want a talk on reliability, systems thinking, or engineering leverage, email me.'
    },

    content: {
      title: 'Studio',
      subtitle: 'Videos and short-form pieces on technology and beyond. Two tracks, one lens: how systems really work.',
      tracks: {
        tech: {
          title: 'TECH',
          description: 'How software actually works in production: reliability, systems design, engineering after AI, and the craft of building durable things.',
          topics: ['Systems design', 'Reliability', 'AI and engineering', 'Open source', 'Career leverage']
        },
        beyond: {
          title: 'BEYOND TECH',
          description: 'The same lens pointed elsewhere: incentives, history, and ideas that outlast news cycles.',
          topics: ['Dharma', 'Geopolitics', 'History', 'Philosophy', 'Books']
        }
      },
      short: 'Short',
      video: 'Video',
      seeAll: 'See all on YouTube',
      collaborateTitle: 'COLLABORATE',
      collaborateText: 'Open to podcasts, conversations, and collaborations that go deeper than hot takes.'
    },

    certifications: {
      title: 'Certifications',
      subtitle: 'Verified credentials, pulled from Credly.',
      verify: 'Verify on Credly',
      badges: 'BADGES',
      empty: 'No badges to show right now. See the full list on',
      expires: 'Expires'
    },

    work: {
      title: 'Work',
      subtitle: 'Production infrastructure at Red Hat, and the things I build on the side.',
      experience: 'EXPERIENCE',
      earlier: 'EARLIER',
      projects: 'PROJECTS',
      source: 'Source',
      updated: 'Updated',
      everythingElse: 'Everything else on GitHub',
      openSource: 'OPEN SOURCE'
    },
    
    // Redirect Section
    redirect: {
      redirecting: 'Redirecting to Blog Post',
      loading: 'Loading...',
      notFound: 'Blog Post Not Found',
      notFoundDesc: 'The blog post you are looking for does not exist.',
      goHome: 'Go Home',
      redirectingTo: 'Redirecting to',
      countdown: 'Redirecting in',
      seconds: 'seconds',
      redirectNow: 'Redirect Now',
      cancel: 'Cancel'
    },
    
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      blog: 'Writing',
      content: 'Studio',
      certifications: 'Certifications',
      work: 'Work',
      talks: 'Talks'
    },
    
    // Footer
    footer: {
      letsTalk: "Have ideas or want to collaborate?",
      letsTalkLink: "Let's Talk →",
      copyright: "All rights reserved."
    },
    
    // Status
    // Rotated in the navbar badge: [desktop, mobile].
    status: {
      items: [
        ['Rajat is in the lab — expect sparks soon.', 'In the lab — sparks coming!'],
        ['Currently building KALPA, a language inspired by Sanskrit', 'Building KALPA'],
        ['Building AuxiVault: save anything, find it later', 'Building AuxiVault'],
        ['Next talk: PIET, Panipat · Oct 2026', 'Next talk: PIET'],
        ['Judging Hack Arena at CodeX 3.0 this October', 'Judging Hack Arena'],
        ['Keeping Red Hat’s edge fast and boring', 'Keeping the edge boring'],
        ['Migrating 35 Akamai properties to Terraform', 'Migrating to Terraform'],
        ['Open to talks, judging & collaborations', 'Open to talks'],
        ['Writing, building, and learning in public', 'Building in public'],
        ['Just published: The Double Left Shift', 'New post is up'],
        ['Studying Sanskrit between deploys', 'Studying Sanskrit'],
        ['Probably singing while the pipeline runs', 'Singing while CI runs'],
        ['Powered by chai and clean abstractions', 'Powered by chai'],
        ['On-call, calm, and caffeinated', 'On-call and calm'],
        ['Building quiet software, one commit at a time', 'One commit at a time'],
        ['Available for interesting problems', 'Send hard problems']
      ]
    }
  },
  
  hi: {
    // Page Titles
    pageTitles: {
      home: 'रजत राय',
      about: 'रजत राय - मेरे बारे में',
      blog: 'रजत राय - लेखन',
      talks: 'रजत राय - वार्ताएँ और निर्णायक',
      studio: 'रजत राय - स्टूडियो',
      certifications: 'रजत राय - प्रमाणपत्र',
      work: 'रजत राय - काम'
    },
    
    common: {
      emailMe: 'ईमेल करें',
      loading: 'लोड हो रहा है…'
    },

    home: {
      eyebrow: 'Red Hat में Software Engineer • निर्माता • दूरदर्शी सोच',
      greeting: 'नमस्ते, मैं रजत हूँ।',
      tagline: 'मैं शांत, भरोसेमंद software बनाता हूँ।',
      intro: 'मैं Red Hat में production infrastructure पर काम करता हूँ। साथ ही, मैं tools, एक programming language, और यह site बनाता हूँ।',
      readNotes: 'मेरे नोट्स पढ़ें',
      seeWork: 'चुनिंदा काम देखें',
      recentWriting: 'हाल का लेखन',
      viewAll: 'सब देखें',
      noPosts: 'अभी कोई पोस्ट नहीं।',
      tech: 'टेक',
      nonTech: 'गैर-टेक',
      philosophyTitle: 'दर्शन',
      philosophy: [
        'स्पष्टता एक design निर्णय है। भ्रम भी।',
        'ज़्यादातर “complexity” अच्छे PR वाला अनचुका कर्ज़ है।',
        'अच्छे systems नायकों पर निर्भर नहीं रहते; वे सही काम को सबसे आसान बना देते हैं।',
        'अच्छा software दिखावा नहीं करता। वह बस सुंदरता से काम करता है।',
        'Leverage ज़्यादा करना नहीं है, ऐसी सीमाएँ चुनना है जो आपका काम खुद कर दें।',
        'अगर आप trade-off नहीं समझा सकते, तो आप निर्णय नहीं समझते।',
        'Engineering में धर्म का अर्थ है साफ़ प्रोत्साहन और ईमानदार सीमाएँ।',
        'जो कंपनियाँ इंसानों की जगह लेने की कोशिश करेंगी, वे असफल होंगी। जो उन्हें सशक्त करेंगी, वे जीतेंगी।',
        'परिवार ही सब कुछ है। हर दूसरी संस्था उसी पर टिकी है।'
      ],
      workTitle: 'काम',
      workSubtitle: 'Red Hat में production infrastructure, और साथ में बनाई गई मेरी चीज़ें।',
      workHighlights: [
        ['एज इन्फ्रास्ट्रक्चर', '35 Akamai properties के Terraform migration का नेतृत्व, जिनमें access.redhat.com भी शामिल है।'],
        ['डिलीवरी', 'Argo CD GitOps और on-demand preview environments के साथ GitLab CI/CD, जिसे 15+ projects ने अपनाया।'],
        ['प्रोडक्शन', 'Production infrastructure के लिए on-call, और AWS पर Helm व Prometheus के साथ एक Drupal platform का संचालन।'],
        ['साइड प्रोजेक्ट', 'AuxiVault, एक क्लिक में ज्ञान सहेजने का tool, और KALPA, संस्कृत से प्रेरित एक programming language।']
      ],
      seeProjects: 'प्रोजेक्ट देखें',
      thoughtsTitle: 'विचार',
      thoughtsSubtitle: 'Systems, leverage, तकनीक और अच्छे जीवन पर छोटे नोट्स।',
      thoughts: [
        'सबसे अच्छी architecture वह है जो अगले बदलाव को सस्ता बना दे।',
        'प्रोत्साहन संस्कृति से पहले आते हैं। संस्कृति प्रोत्साहनों के पीछे चलती है।',
        'System वह है जो अतिरिक्त मेहनत करने वाले लोगों को हटाने के बाद बचता है।',
        '“Scale” अक्सर बस बिना कीमत लगाई coupling होती है।',
        'स्थिरता सीमाओं से आती है, आशावाद से नहीं।',
        'समय एक design constraint है; उसे memory या CPU की तरह बरतें।',
        'कौशल गति में नहीं है। कौशल यह जानने में है कि किसे नज़रअंदाज़ करना है।',
        'Tools leverage नहीं बनाते, परख बनाती है।',
        'धर्म वह सही काम है जो तब किया जाए जब कोई देख न रहा हो; engineering भी यही है।',
        'भू-राजनीति धीमी घड़ियों और ऊँचे दाँव वाला systems design है।'
      ],
      subscribe: 'लंबे नोट्स पढ़ें / सब्सक्राइब करें',
      proofTitle: 'प्रमाण',
      proof: [
        ['Red Hat', '2022 से, intern से Software Engineer तक।'],
        ['वक्ता', 'DevOps Con Singapore, Humanity 2026 by Bugbar, और कॉलेज। अगला: PIET, अक्टूबर 2026।'],
        ['निर्णायक', 'छह hackathons में judge या mentor, जिनमें एक WWF India में।'],
        ['Code से परे', 'गायन, खाना बनाना, और शास्त्रीय भारतीय भाषाएँ।']
      ],
      seeTalks: 'वार्ताएँ और निर्णायक देखें',
      actionTitle: 'संपर्क',
      actionText: 'अगर आप कुछ गंभीर बना रहे हैं, तो कठिन समस्या भेजिए। या मुझे बोलने या judge करने के लिए आमंत्रित करें।'
    },

    about: {
      eyebrow: 'Red Hat में Software Engineer',
      title: 'मेरे बारे में',
      subtitle: 'मुझे किन बातों की परवाह है, उसका एक छोटा नक्शा: systems, सीमाएँ, और लंबा खेल।',
      aboutTitle: 'परिचय',
      aboutItems: [
        'मैं रजत राय हूँ। मैं ऐसे systems बनाता हूँ जिन्हें चलाना, समझाने से आसान हो।',
        'मुझे reliability, साफ़ interfaces, और समय की कसौटी पर टिकने वाले निर्णयों की परवाह है।',
        'मुझे वे समस्याएँ खींचती हैं जहाँ प्रोत्साहन, सीमाएँ और feedback loops, code से ज़्यादा मायने रखते हैं।',
        'मैं पढ़कर, लिखकर और बनाकर सीखता हूँ।'
      ],
      redHat: 'मैं 2022 से Red Hat में हूँ, intern से Software Engineer तक, production infrastructure, edge delivery और CI/CD पर काम करते हुए।',
      seeWork: 'मेरा काम देखें',
      closing: 'मैं एक धीमी लेकिन स्थिर परिवर्तन यात्रा पर हूँ, एक engineer के रूप में भी और एक इंसान के रूप में भी।',
      interestsTitle: 'रुचियाँ',
      interests: [
        'Systems thinking (चीज़ें वास्तव में कैसे व्यवहार करती हैं, न कि उनका वर्णन कैसे होता है)।',
        'Leverage के रूप में तकनीक, खासकर ऐसे tools जो मानसिक बोझ घटाएँ।',
        'धर्म और अनुशासन: असुविधा होने पर भी सही काम करना।',
        'भू-राजनीति और इतिहास: लंबे समय के क्षितिज, असली trade-offs।',
        'गायन, खाना बनाना, और भाषाओं का अध्ययन, विशेषकर शास्त्रीय भारतीय भाषाएँ।'
      ],
      skillsTitle: 'तकनीकी कौशल',
      skillLabels: ['Infrastructure और Cloud', 'CI/CD और GitOps', 'Observability और Security', 'प्रोग्रामिंग भाषाएँ', 'Backend', 'Databases', 'Frontend', 'AI और Data'],
      philosophyTitle: 'दर्शन',
      philosophy: [
        'स्पष्टता एक feature है। जटिलता एक कीमत है।',
        'अच्छा system सही काम को सबसे आसान काम बना देता है।',
        'निर्णय लिखकर रखें। System की एक स्मृति होनी चाहिए।',
        'अच्छा software दिखावा नहीं करता। वह बस सुंदरता से काम करता है।',
        'जो कंपनियाँ इंसानों की जगह लेने की कोशिश करेंगी, वे असफल होंगी। जो उन्हें सशक्त करेंगी, वे जीतेंगी।',
        'परिवार ही सब कुछ है। हर दूसरी संस्था उसी पर टिकी है।'
      ],
      booksTitle: 'किताबें / विचार जिन पर मैं लौटता हूँ',
      books: [
        'Stoicism, भारतीय दर्शन, और first-principles सोच।',
        'पैटर्न पहचानने के साधन के रूप में इतिहास: प्रोत्साहन, भूगोल, संस्थाएँ।',
        'संक्षेपण के रूप में लेखन: केवल वही रखें जो सच और उपयोगी हो।'
      ],
      likesTitle: 'जो मुझे पसंद है',
      likes: [
        'सरल interfaces।',
        'शांत tools जो ध्यान का सम्मान करें।',
        'नक्शे, समयरेखाएँ, और मूल स्रोत।',
        'अच्छा भोजन। अच्छी शांति। अच्छा काम।'
      ]
    },
    
    // Blog Section
    blog: {
      title: 'लेखन',
      subtitle: 'सिस्टम, तकनीक, लीवरेज और जीवन पर संक्षिप्त नोट्स',
      techPosts: 'टेक पोस्ट',
      nonTechPosts: 'गैर-टेक पोस्ट',
      comingSoon: 'जल्द आ रहा है',
      comingSoonDesc: 'ब्लॉग पोस्ट यहां जल्द उपलब्ध होंगे!',
      readMore: 'और पढ़ें',
      loading: 'ब्लॉग पोस्ट लोड हो रहे हैं...',
      error: 'पोस्ट लोड करने में त्रुटि',
      tryAgain: 'फिर से कोशिश करें'
    },

    talks: {
      title: 'वार्ताएँ और निर्णायक',
      subtitle: 'Conference talks, university sessions, और वे hackathons जिनमें मैं निर्णायक या mentor रहा: systems, AI, और engineering leverage पर।',
      upcoming: 'आगामी',
      past: 'वार्ताएँ',
      comingSoon: 'जल्द',
      talk: 'वार्ता',
      roles: { Judge: 'निर्णायक', Mentor: 'मार्गदर्शक' },
      judgingTitle: 'निर्णायक / मार्गदर्शन',
      judgingIntro: 'मैं hackathons में judge और mentor करता हूँ, और उनमें systems thinking, engineering की गुणवत्ता, और trade-offs की स्पष्टता देखता हूँ।',
      inviteTitle: 'आमंत्रण',
      inviteText: 'अगर आप reliability, systems thinking, या engineering leverage पर talk चाहते हैं, तो मुझे ईमेल करें।'
    },

    content: {
      title: 'स्टूडियो',
      subtitle: 'तकनीक और उससे परे पर वीडियो और छोटे पीस। दो धाराएँ, एक दृष्टि: systems वास्तव में कैसे काम करते हैं।',
      tracks: {
        tech: {
          title: 'टेक',
          description: 'Production में software वास्तव में कैसे काम करता है: reliability, systems design, AI के बाद की engineering, और टिकाऊ चीज़ें बनाने की कला।',
          topics: ['Systems design', 'Reliability', 'AI और engineering', 'Open source', 'Career leverage']
        },
        beyond: {
          title: 'टेक से परे',
          description: 'वही दृष्टि, कहीं और: प्रोत्साहन, इतिहास, और ऐसे विचार जो खबरों के चक्र से आगे टिकते हैं।',
          topics: ['धर्म', 'भू-राजनीति', 'इतिहास', 'दर्शन', 'किताबें']
        }
      },
      short: 'शॉर्ट',
      video: 'वीडियो',
      seeAll: 'YouTube पर सब देखें',
      collaborateTitle: 'सहयोग',
      collaborateText: 'Podcasts, बातचीत, और ऐसे सहयोग के लिए तैयार हूँ जो सतही राय से गहरे जाएँ।'
    },

    certifications: {
      title: 'प्रमाणपत्र',
      subtitle: 'Credly से लिए गए सत्यापित प्रमाणपत्र।',
      verify: 'Credly पर सत्यापित करें',
      badges: 'बैज',
      empty: 'अभी दिखाने के लिए कोई बैज नहीं। पूरी सूची देखें:',
      expires: 'समाप्ति'
    },

    work: {
      title: 'काम',
      subtitle: 'Red Hat में production infrastructure, और साथ में बनाई गई मेरी चीज़ें।',
      experience: 'अनुभव',
      earlier: 'पहले',
      projects: 'प्रोजेक्ट',
      source: 'सोर्स',
      updated: 'अपडेट',
      everythingElse: 'बाकी सब GitHub पर',
      openSource: 'ओपन सोर्स'
    },
    
    // Redirect Section
    redirect: {
      redirecting: 'ब्लॉग पोस्ट पर पुनर्निर्देशित कर रहे हैं',
      loading: 'लोड हो रहा है...',
      notFound: 'ब्लॉग पोस्ट नहीं मिली',
      notFoundDesc: 'आप जिस ब्लॉग पोस्ट की तलाश कर रहे हैं वह मौजूद नहीं है।',
      goHome: 'होम पर जाएं',
      redirectingTo: 'पुनर्निर्देशित कर रहे हैं',
      countdown: 'पुनर्निर्देशित हो रहा है',
      seconds: 'सेकंड में',
      redirectNow: 'अभी पुनर्निर्देशित करें',
      cancel: 'रद्द करें'
    },
    
    // Navigation
    nav: {
      home: 'होम',
      about: 'मेरे बारे में',
      blog: 'लेखन',
      content: 'स्टूडियो',
      certifications: 'प्रमाणपत्र',
      work: 'काम',
      talks: 'वार्ताएँ'
    },
    
    // Footer
    footer: {
      letsTalk: "कोई विचार है या सहयोग करना चाहते हैं?",
      letsTalkLink: "बात करते हैं →",
      copyright: "सर्वाधिकार सुरक्षित।"
    },
    
    // Status
    status: {
      items: [
        ['रजत प्रयोगशाला में है — जल्द ही चिंगारियाँ उड़ने वाली हैं!', 'प्रयोगशाला में — चिंगारियाँ आ रही हैं!'],
        ['KALPA बना रहा हूँ, संस्कृत से प्रेरित एक भाषा', 'KALPA बना रहा हूँ'],
        ['AuxiVault बना रहा हूँ: कुछ भी सहेजें, बाद में खोजें', 'AuxiVault बना रहा हूँ'],
        ['अगली वार्ता: PIET, पानीपत · अक्टूबर 2026', 'अगली वार्ता: PIET'],
        ['इस अक्टूबर CodeX 3.0 में Hack Arena का निर्णायक', 'Hack Arena का निर्णायक'],
        ['Red Hat के edge को तेज़ और बेफ़िक्र रखते हुए', 'Edge को बेफ़िक्र रखते हुए'],
        ['35 Akamai properties को Terraform पर ले जा रहा हूँ', 'Terraform पर migration'],
        ['वार्ताओं, निर्णायक और सहयोग के लिए उपलब्ध', 'वार्ताओं के लिए उपलब्ध'],
        ['खुले में लिखना, बनाना और सीखना', 'खुले में निर्माण'],
        ['नई पोस्ट: The Double Left Shift', 'नई पोस्ट आ गई'],
        ['Deploys के बीच संस्कृत पढ़ रहा हूँ', 'संस्कृत पढ़ रहा हूँ'],
        ['Pipeline चलते-चलते शायद गा रहा हूँ', 'CI के साथ गाना'],
        ['चाय और साफ़ abstractions से संचालित', 'चाय से संचालित'],
        ['On-call, शांत, और चाय के सहारे', 'On-call और शांत'],
        ['हर commit के साथ शांत software बनाते हुए', 'एक-एक commit'],
        ['दिलचस्प समस्याओं के लिए उपलब्ध', 'कठिन समस्याएँ भेजें']
      ]
    }
  },

  bh: {
    // Page Titles
    pageTitles: {
      home: 'रजत राय',
      about: 'रजत राय - हमारे बारे में',
      blog: 'रजत राय - लेखन',
      talks: 'रजत राय - वार्ता आ निर्णायक',
      studio: 'रजत राय - स्टूडियो',
      certifications: 'रजत राय - प्रमाणपत्र',
      work: 'रजत राय - काम'
    },
    
    common: {
      emailMe: 'ईमेल करीं',
      loading: 'लोड हो रहल बा…'
    },

    home: {
      eyebrow: 'Red Hat में Software Engineer • बनावे वाला • दूर के सोचे वाला',
      greeting: 'प्रणाम, हम रजत हईं।',
      tagline: 'हम शांत, भरोसेमंद software बनाइले।',
      intro: 'हम Red Hat में production infrastructure पर काम करीले। साथे-साथे, हम tools, एगो programming language, आ ई site बनाइले।',
      readNotes: 'हमार नोट्स पढ़ीं',
      seeWork: 'चुनल काम देखीं',
      recentWriting: 'हाल के लेख',
      viewAll: 'सभ देखीं',
      noPosts: 'अभी कवनो पोस्ट नइखे।',
      tech: 'टेक',
      nonTech: 'नॉन-टेक',
      philosophyTitle: 'दर्शन',
      philosophy: [
        'साफ़ बात एगो design के फ़ैसला ह। उलझन भी।',
        'जादातर “complexity” बढ़िया PR वाला बिना चुकावल करजा ह।',
        'बढ़िया system नायक के भरोसे ना चलेला; ऊ सही काम के सबसे आसान बना देला।',
        'बढ़िया software के चिल्लाए के ज़रूरत नइखे। बस सुंदर ढंग से काम करे के चाहीं।',
        'Leverage मतलब जादा कइल ना, अइसन सीमा चुनल ह जवन रउरा खातिर काम क देव।',
        'अगर रउरा trade-off ना समझा सकीं, त रउरा फ़ैसला ना समझनी।',
        'Engineering में धरम मतलब साफ़ प्रोत्साहन आ ईमानदार सीमा।',
        'जवन कंपनी आदमी के जगह लेवे के कोसिस करी, ऊ फेल होई। जवन ओकरा के मज़बूत करी, ऊ जीती।',
        'परिवार सब कुछ ह। बाकी हर संस्था ओही पर टिकल बा।'
      ],
      workTitle: 'काम',
      workSubtitle: 'Red Hat में production infrastructure, आ साथे-साथे बनावल हमार चीज।',
      workHighlights: [
        ['एज इन्फ्रास्ट्रक्चर', '35 Akamai properties के Terraform migration के अगुआई, जवना में access.redhat.com भी बा।'],
        ['डिलीवरी', 'Argo CD GitOps आ on-demand preview environments के साथे GitLab CI/CD, जवना के 15+ projects अपनवले बा।'],
        ['प्रोडक्शन', 'Production infrastructure खातिर on-call, आ AWS पर Helm आ Prometheus के साथे एगो Drupal platform चलावल।'],
        ['साइड प्रोजेक्ट', 'AuxiVault, एक क्लिक में जानकारी सहेजे वाला tool, आ KALPA, संस्कृत से प्रेरित एगो programming language।']
      ],
      seeProjects: 'प्रोजेक्ट देखीं',
      thoughtsTitle: 'विचार',
      thoughtsSubtitle: 'Systems, leverage, तकनीक आ नीमन जिनगी पर छोट नोट्स।',
      thoughts: [
        'सबसे बढ़िया architecture ऊ ह जवन अगिला बदलाव के सस्ता बना देव।',
        'प्रोत्साहन संस्कृति से पहिले आवेला। संस्कृति प्रोत्साहन के पीछे चलेला।',
        'System ऊ ह जवन फालतू मेहनत करे वाला लोगन के हटवला के बाद बचेला।',
        '“Scale” अक्सर बस बिना दाम लगावल coupling होला।',
        'स्थिरता सीमा से आवेला, आसा से ना।',
        'समय एगो design constraint ह; ओकरा के memory भा CPU नियर बरतीं।',
        'हुनर तेज़ी में नइखे। हुनर ई जाने में बा कि का छोड़े के बा।',
        'Tools leverage ना बनावेला, परख बनावेले।',
        'धरम ऊ सही काम ह जवन तब होखे जब केहू ना देखत होखे; engineering भी ओइसने ह।',
        'भू-राजनीति धीमा घड़ी आ ऊँच दाँव वाला systems design ह।'
      ],
      subscribe: 'लमहर नोट्स पढ़ीं / सब्सक्राइब करीं',
      proofTitle: 'प्रमाण',
      proof: [
        ['Red Hat', '2022 से, intern से Software Engineer तक।'],
        ['वक्ता', 'DevOps Con Singapore, Humanity 2026 by Bugbar, आ कॉलेज। अगिला: PIET, अक्टूबर 2026।'],
        ['निर्णायक', 'छव गो hackathon में judge भा mentor, जवना में एगो WWF India में।'],
        ['Code से आगे', 'गावल, खाना बनावल, आ शास्त्रीय भारतीय भाषा।']
      ],
      seeTalks: 'वार्ता आ निर्णायक देखीं',
      actionTitle: 'संपर्क',
      actionText: 'अगर रउरा कुछ गंभीर बना रहल बानी, त कठिन समस्या भेजीं। भा हमके बोले भा judge करे खातिर बोलाईं।'
    },

    about: {
      eyebrow: 'Red Hat में Software Engineer',
      title: 'हमार बारे में',
      subtitle: 'हमरा का के परवाह बा, ओकर एगो छोट नक्शा: systems, सीमा, आ लमहर खेल।',
      aboutTitle: 'परिचय',
      aboutItems: [
        'हम रजत राय हईं। हम अइसन system बनाइले जवना के चलावल, समझावल से आसान होखे।',
        'हमरा reliability, साफ़ interfaces, आ समय के कसौटी पर टिके वाला फ़ैसला के परवाह बा।',
        'हमके ऊ समस्या खींचेला जहाँ प्रोत्साहन, सीमा आ feedback loops, code से जादा मायने रखेला।',
        'हम पढ़ के, लिख के आ बना के सीखीले।'
      ],
      redHat: 'हम 2022 से Red Hat में बानी, intern से Software Engineer तक, production infrastructure, edge delivery आ CI/CD पर काम करत।',
      seeWork: 'हमार काम देखीं',
      closing: 'हम एगो धीमा बाकिर पक्का बदलाव के राह पर बानी, engineer के रूप में भी आ इंसान के रूप में भी।',
      interestsTitle: 'रुचि',
      interests: [
        'Systems thinking (चीज असल में कइसे चलेला, ना कि ओकर बखान कइसे होला)।',
        'Leverage के रूप में तकनीक, ख़ास कर के अइसन tools जवन दिमाग के बोझ घटावे।',
        'धरम आ अनुशासन: दिक्कत होखे तबो सही काम कइल।',
        'भू-राजनीति आ इतिहास: लमहर समय, असली trade-offs।',
        'गावल, खाना बनावल, आ भाषा पढ़ल, ख़ास कर के शास्त्रीय भारतीय भाषा।'
      ],
      skillsTitle: 'तकनीकी हुनर',
      skillLabels: ['Infrastructure आ Cloud', 'CI/CD आ GitOps', 'Observability आ Security', 'प्रोग्रामिंग भाषा', 'Backend', 'Databases', 'Frontend', 'AI आ Data'],
      philosophyTitle: 'दर्शन',
      philosophy: [
        'साफ़ बात एगो feature ह। जटिलता एगो कीमत ह।',
        'बढ़िया system सही काम के सबसे आसान काम बना देला।',
        'फ़ैसला लिख के राखीं। System के आपन याददाश्त होखे के चाहीं।',
        'बढ़िया software के चिल्लाए के ज़रूरत नइखे। बस सुंदर ढंग से काम करे के चाहीं।',
        'जवन कंपनी आदमी के जगह लेवे के कोसिस करी, ऊ फेल होई। जवन ओकरा के मज़बूत करी, ऊ जीती।',
        'परिवार सब कुछ ह। बाकी हर संस्था ओही पर टिकल बा।'
      ],
      booksTitle: 'किताब / विचार जवना पर हम लवटीले',
      books: [
        'Stoicism, भारतीय दर्शन, आ first-principles सोच।',
        'पैटर्न पहचाने के साधन के रूप में इतिहास: प्रोत्साहन, भूगोल, संस्था।',
        'निचोड़ के रूप में लेखन: खाली ऊहे राखीं जवन साँच आ काम के होखे।'
      ],
      likesTitle: 'जवन हमके नीक लागेला',
      likes: [
        'सादा interfaces।',
        'शांत tools जवन ध्यान के आदर करे।',
        'नक्शा, समयरेखा, आ असली स्रोत।',
        'नीमन खाना। नीमन शांति। नीमन काम।'
      ]
    },
    blog: {
      title: 'लेखन',
      subtitle: 'सिस्टम, टेक्नोलॉजी, लीवरेज आ जिनगी पर छोट नोट्स',
      techPosts: 'टेक पोस्ट',
      nonTechPosts: 'नॉन-टेक पोस्ट',
      comingSoon: 'जल्द आ रहल बा',
      comingSoonDesc: 'ब्लॉग पोस्ट इहाँ जल्दे उपलब्ध होई!',
      readMore: 'आगे पढ़ीं',
      loading: 'ब्लॉग पोस्ट लोड हो रहल बा...',
      error: 'पोस्ट लोड करे में त्रुटि',
      tryAgain: 'फिर से कोशिश करीं',
    },

    talks: {
      title: 'वार्ता आ निर्णायक',
      subtitle: 'Conference talks, university sessions, आ ऊ hackathons जवना में हम निर्णायक भा mentor रहनी: systems, AI, आ engineering leverage पर।',
      upcoming: 'आवे वाला',
      past: 'वार्ता',
      comingSoon: 'जल्दे',
      talk: 'वार्ता',
      roles: { Judge: 'निर्णायक', Mentor: 'मार्गदर्शक' },
      judgingTitle: 'निर्णायक / मार्गदर्शन',
      judgingIntro: 'हम hackathons में judge आ mentor करीले, आ ओह में systems thinking, engineering के गुणवत्ता, आ trade-offs के साफ़ समझ देखीले।',
      inviteTitle: 'नेवता',
      inviteText: 'अगर रउरा reliability, systems thinking, भा engineering leverage पर talk चाहीं, त हमके ईमेल करीं।'
    },

    content: {
      title: 'स्टूडियो',
      subtitle: 'टेक्नोलॉजी आ ओकरा से आगे पर वीडियो आ छोट पीस। दू धारा, एक नजर: systems असल में कइसे चलेला।',
      tracks: {
        tech: {
          title: 'टेक',
          description: 'Production में software असल में कइसे चलेला: reliability, systems design, AI के बाद के engineering, आ टिकाऊ चीज बनावे के कला।',
          topics: ['Systems design', 'Reliability', 'AI आ engineering', 'Open source', 'Career leverage']
        },
        beyond: {
          title: 'टेक से आगे',
          description: 'ऊहे नजर, कहीं अउर: प्रोत्साहन, इतिहास, आ अइसन विचार जवन खबर के चक्कर से आगे टिकेला।',
          topics: ['धरम', 'भू-राजनीति', 'इतिहास', 'दर्शन', 'किताब']
        }
      },
      short: 'शॉर्ट',
      video: 'वीडियो',
      seeAll: 'YouTube पर सभ देखीं',
      collaborateTitle: 'साथ काम',
      collaborateText: 'Podcasts, बातचीत, आ अइसन साथ काम खातिर तैयार बानी जवन ऊपरी राय से गहिर जाव।'
    },

    certifications: {
      title: 'प्रमाणपत्र',
      subtitle: 'Credly से लिहल गइल सत्यापित प्रमाणपत्र।',
      verify: 'Credly पर जाँचीं',
      badges: 'बैज',
      empty: 'अभी देखावे खातिर कवनो बैज नइखे। पूरा सूची देखीं:',
      expires: 'खतम'
    },

    work: {
      title: 'काम',
      subtitle: 'Red Hat में production infrastructure, आ साथे-साथे बनावल हमार चीज।',
      experience: 'अनुभव',
      earlier: 'पहिले',
      projects: 'प्रोजेक्ट',
      source: 'सोर्स',
      updated: 'अपडेट',
      everythingElse: 'बाकी सभ GitHub पर',
      openSource: 'ओपन सोर्स'
    },
    
    // Redirect Section
    redirect: {
      redirecting: 'ब्लॉग पोस्ट पर भेज रहल बानी',
      loading: 'लोड हो रहल बा...',
      notFound: 'ब्लॉग पोस्ट ना मिलल',
      notFoundDesc: 'जे ब्लॉग पोस्ट तानी ढूंढ रहल बानी ऊ मौजूद नइखे।',
      goHome: 'होम पर जाइं',
      redirectingTo: 'भेज रहल बानी',
      countdown: 'भेज रहल बानी',
      seconds: 'सेकंड में',
      redirectNow: 'अभी भेजीं',
      cancel: 'रद्द करीं'
    },
    
    nav: {
      home: 'होम',
      about: 'हमार बारे में',
      blog: 'लेखन',
      content: 'स्टूडियो',
      certifications: 'प्रमाणपत्र',
      work: 'काम',
      talks: 'वार्ता',
    },
    footer: {
      letsTalk: 'कोई विचार बा या सहयोग करे के चाह तानी?',
      letsTalkLink: 'बात करीं →',
      copyright: 'सर्वाधिकार सुरक्षित।',
    },
    status: {
      items: [
        ['रजत लैब में बाँड़े — अब कुछ ना कुछ त धांसू होखे वाला बा !', 'लैब में बाँड़े — धांसू होखे वाला बा!'],
        ['KALPA बना रहल बानी, संस्कृत से प्रेरित एगो भाषा', 'KALPA बना रहल बानी'],
        ['AuxiVault बना रहल बानी: कुछुओ सहेजीं, बाद में खोजीं', 'AuxiVault बना रहल बानी'],
        ['अगिला वार्ता: PIET, पानीपत · अक्टूबर 2026', 'अगिला वार्ता: PIET'],
        ['एह अक्टूबर CodeX 3.0 में Hack Arena के निर्णायक', 'Hack Arena के निर्णायक'],
        ['Red Hat के edge के तेज़ आ बेफ़िकिर राखत', 'Edge बेफ़िकिर राखत'],
        ['35 Akamai properties के Terraform पर ले जा रहल बानी', 'Terraform पर migration'],
        ['वार्ता, निर्णायक आ साथ काम खातिर तैयार', 'वार्ता खातिर तैयार'],
        ['खुला में लिखत, बनावत आ सीखत', 'खुला में बनावत'],
        ['नया पोस्ट: The Double Left Shift', 'नया पोस्ट आ गइल'],
        ['Deploy के बीच संस्कृत पढ़त', 'संस्कृत पढ़त'],
        ['Pipeline चलत घरी शायद गावत बानी', 'CI के साथे गाना'],
        ['चाय आ साफ़ abstractions के भरोसे', 'चाय के भरोसे'],
        ['On-call, शांत, आ चाय के सहारे', 'On-call आ शांत'],
        ['एक-एक commit से शांत software बनावत', 'एक-एक commit'],
        ['दिलचस्प समस्या खातिर तैयार', 'कठिन समस्या भेजीं']
      ]
    }
  }
}

// Get translation function
const lookup = (langObj, key) => key.split('.').reduce((acc, k) => acc?.[k], langObj)

// Missing keys fall back to English, then to the key itself.
export function getTranslation(lang, key) {
  return lookup(TRANSLATIONS[lang], key) ?? lookup(TRANSLATIONS.en, key) ?? key
}