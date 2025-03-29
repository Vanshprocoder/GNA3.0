import React, { useState, useRef, useEffect } from 'react';
import SuggestionPopup from './SuggestionPopup';

const ResumeScoreAnalysis = () => {
  const [activeSection, setActiveSection] = useState('ats-parse');
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({
    title: '',
    aiSuggestion: ''
  });
  
  // Refs for each section to enable scrolling
  const sectionRefs = useRef({});

  // AI suggestions for each section
  const aiSuggestions = {
    'ats-parse': "I've analyzed your resume, and it needs significant improvements to pass ATS systems. Here are my suggestions:\n\n1. Remove graphics, tables, and custom formatting\n2. Use standard section headings (Experience, Education, Skills)\n3. Include keywords from the job description\n4. Use a single-column layout\n5. Save as a .docx file rather than PDF\n6. Remove headers and footers\n7. Use standard fonts like Arial or Calibri",
    
    'impact': "To improve the impact of your resume, quantify your achievements with metrics. For example:\n\n• Instead of 'Managed a team', write 'Managed a team of 12 developers'\n• Instead of 'Increased sales', write 'Increased sales by 27% in 6 months'\n• Instead of 'Reduced costs', write 'Reduced operational costs by $50K annually'\n• Instead of 'Led projects', write 'Led 5 cross-functional projects with $1M+ budgets'",
    
    'keywords': "Based on analysis of relevant job descriptions, consider adding these keywords to your resume:\n\n• Project Management\n• Cross-functional Leadership\n• Agile Methodologies\n• Data Analysis\n• Budget Management\n• Strategic Planning\n• Performance Optimization\n• Client Relationship Management\n• Revenue Growth\n• Team Building",
    
    'sections': "Your resume should include the following essential sections:\n\n1. Professional Summary/Objective\n2. Work Experience\n3. Skills (both technical and soft skills)\n4. Education\n5. Certifications\n6. Achievements/Awards\n7. Contact Information\n\nConsider adding a Professional Summary at the top to quickly highlight your value proposition.",
    
    'style': "For better visual appeal, make these adjustments:\n\n• Use consistent formatting for all headings\n• Ensure adequate white space between sections\n• Limit to 2 font styles maximum\n• Use bullet points consistently\n• Align all text and elements properly\n• Use color sparingly and professionally\n• Ensure margins are between 0.5-1 inch on all sides",
    
    'space': "To optimize space on your resume:\n\n• Remove redundant information\n• Use bullet points instead of paragraphs\n• Limit bullet points to 4-6 per role\n• Use active, concise language\n• Remove outdated experience (>10-15 years old)\n• Condense education details if you have significant work experience\n• Reduce margins slightly if needed (no smaller than 0.5 inch)",
    
    'grammar': "I found these grammar and spelling issues:\n\n1. 'Manger' should be 'Manager' in your job title\n2. Inconsistent use of past/present tense in job descriptions\n3. Subject-verb agreement error in your summary ('The team were' should be 'The team was')\n4. Misspelled industry term: 'Agyle' should be 'Agile'\n\nConsider using Grammarly or a similar tool for a thorough check.",
    
    'action-verbs': "Replace weak verbs with these powerful action verbs:\n\n• Instead of 'Responsible for managing' use 'Directed' or 'Led'\n• Instead of 'Worked on improving' use 'Enhanced' or 'Optimized'\n• Instead of 'Helped with implementation' use 'Implemented' or 'Executed'\n• Instead of 'Made updates to' use 'Revamped' or 'Redesigned'\n• Instead of 'Was part of' use 'Collaborated' or 'Partnered'"
  };

  // Expanded scoreCategories with more entries
  const scoreCategories = [
    {
      id: 'ats-parse',
      title: 'ATS & Format',
      icon: 'file-alt',
      iconColor: 'text-red-500',
      score: '28%',
      scoreClass: 'bg-red-100 text-red-600',
      category: 'ESSENTIALS',
      issues: 7
    },
    {
      id: 'impact',
      title: 'Content Quality',
      icon: 'chart-line',
      iconColor: 'text-orange-500',
      score: '65%',
      scoreClass: 'bg-orange-100 text-orange-600',
      category: 'ESSENTIALS',
      issues: 3
    },
    {
      id: 'keywords',
      title: 'Keywords Usage',
      icon: 'key',
      iconColor: 'text-yellow-500',
      score: '42%',
      scoreClass: 'bg-yellow-100 text-yellow-600',
      category: 'ESSENTIALS',
      issues: 5
    },
    {
      id: 'sections',
      title: 'Structure',
      icon: 'layer-group',
      iconColor: 'text-blue-500',
      score: '67%',
      scoreClass: 'bg-blue-100 text-blue-600',
      category: 'LAYOUT',
      issues: 2
    },
    {
      id: 'style',
      title: 'Visual Appeal',
      icon: 'paint-brush',
      iconColor: 'text-green-500',
      score: '75%',
      scoreClass: 'bg-green-100 text-green-600',
      category: 'LAYOUT',
      issues: 1
    },
    {
      id: 'space',
      title: 'Space Utilization',
      icon: 'expand',
      iconColor: 'text-indigo-500',
      score: '80%',
      scoreClass: 'bg-indigo-100 text-indigo-600',
      category: 'LAYOUT',
      issues: 1
    },
    {
      id: 'grammar',
      title: 'Grammar & Spelling',
      icon: 'spell-check',
      iconColor: 'text-purple-500',
      score: '90%',
      scoreClass: 'bg-purple-100 text-purple-600',
      category: 'LANGUAGE',
      issues: 2
    },
    {
      id: 'action-verbs',
      title: 'Action Verbs',
      icon: 'bolt',
      iconColor: 'text-pink-500',
      score: '50%',
      scoreClass: 'bg-pink-100 text-pink-600',
      category: 'LANGUAGE',
      issues: 4
    }
  ];

  const sectionContent = {
    'ats-parse': {
      title: 'ATS & FORMAT ANALYSIS',
      icon: 'robot',
      issues: '7 ISSUES FOUND',
      description: [
        "An <strong>Applicant Tracking System</strong> commonly referred to as <strong>ATS</strong> is a system used by employers and recruiters to quickly scan a large number of job applications.",
        "A high parse rate of your resume ensures that the ATS can read your resume, experience, and skills. This increases the chance of getting your resume seen by recruiters."
      ],
      scorePercent: '28%',
      scoreColor: 'from-red-500 to-red-400',
      scoreTitle: 'Critical Issues Detected',
      scoreDescription: [
        "We parsed only 28% of your resume successfully using an industry-leading ATS.",
        "There's a chance the most important information on your resume isn't visible by the ATS. Build an ATS-friendly resume using Enhancv's resume and cover letter templates."
      ],
      actionText: "Build an ATS-friendly resume using Enhancv's resume templates",
      design: "error", // Custom design indicator
      layout: "standard" // Layout style
    },
    'impact': {
      title: 'CONTENT QUALITY',
      icon: 'chart-line',
      issues: '3 ISSUES FOUND',
      description: [
        "Quantifying your accomplishments with specific metrics and numbers makes your achievements more tangible and impressive to hiring managers.",
        "Your resume could benefit from more measurable results to demonstrate the scope and impact of your work."
      ],
      scorePercent: '65%',
      scoreColor: 'from-orange-400 to-yellow-300',
      scoreTitle: 'Room for Improvement',
      scoreDescription: [
        "Only 65% of your experience sections include quantifiable achievements.",
        "Try adding specific numbers, percentages, and metrics to showcase the scale and impact of your work. This helps recruiters better understand your potential value."
      ],
      actionText: "Upgrade to Premium to unlock Impact Suggestions",
      design: "warning", // Custom design indicator
      layout: "split" // Layout style
    },
    'sections': {
      title: 'STRUCTURE ANALYSIS',
      icon: 'layer-group',
      issues: '2 ISSUES FOUND',
      description: [
        "A well-structured resume should include all essential sections that recruiters expect to see, such as contact information, professional summary, work experience, education, and skills.",
        "Your resume includes most of the essential sections, but there are a couple of missing or incomplete areas."
      ],
      scorePercent: '67%',
      scoreColor: 'from-blue-400 to-blue-300',
      scoreTitle: 'Almost There!',
      scoreDescription: [
        "Your resume is missing 2 recommended sections: a dedicated Skills section and a Professional Summary.",
        "Adding these sections would make your resume more comprehensive and help you stand out to both ATS systems and human recruiters."
      ],
      actionText: "Add Missing Sections",
      design: "info", // Custom design indicator
      layout: "card" // Layout style
    },
    'style': {
      title: 'VISUAL APPEAL',
      icon: 'paint-brush',
      issues: '1 ISSUE FOUND',
      description: [
        "The visual style of your resume contributes to its readability and professional appearance. A clean, consistent design helps make a positive impression.",
        "Your resume has a good visual style overall, with just a few minor improvements possible."
      ],
      scorePercent: '75%',
      scoreColor: 'from-green-400 to-green-500',
      scoreTitle: 'Good Design',
      scoreDescription: [
        "Your resume has a professional appearance with consistent fonts and good use of white space.",
        "Consider adjusting the color scheme to be more industry-appropriate and ensuring all headings use consistent styling."
      ],
      actionText: "Explore Professional Templates",
      design: "success", // Custom design indicator
      layout: "banner" // Layout style
    },
    'keywords': {
      title: 'KEYWORDS ANALYSIS',
      icon: 'key',
      issues: '5 ISSUES FOUND',
      description: [
        "Including relevant keywords from the job description is crucial for passing through ATS filters and showing that you're a good match for the position.",
        "Your resume is missing several important keywords that frequently appear in job postings for your target role."
      ],
      scorePercent: '42%',
      scoreColor: 'from-yellow-400 to-yellow-300',
      scoreTitle: 'Needs Improvement',
      scoreDescription: [
        "We identified 12 important keywords from job descriptions in your field, but your resume only includes 5 of them.",
        "Consider incorporating more relevant industry terms, technical skills, and job-specific language to improve your chances of being selected."
      ],
      actionText: "Get Keyword Suggestions",
      design: "warning", // Custom design indicator
      layout: "compact" // Layout style
    },
    'space': {
      title: 'SPACE UTILIZATION',
      icon: 'expand',
      issues: '1 ISSUE FOUND',
      description: [
        "Effective use of space ensures your resume is comprehensive while remaining concise and readable.",
        "Your resume has good overall space utilization, but there are some areas that could be optimized."
      ],
      scorePercent: '80%',
      scoreColor: 'from-indigo-400 to-indigo-300',
      scoreTitle: 'Good Space Usage',
      scoreDescription: [
        "Your resume maintains good margins and spacing between sections, but some areas appear cramped with too much text.",
        "Consider condensing verbose descriptions and using bullet points more effectively to create a more balanced layout."
      ],
      actionText: "Optimize Space Usage",
      design: "info", // Custom design indicator
      layout: "dashboard" // Layout style
    },
    'grammar': {
      title: 'GRAMMAR & SPELLING',
      icon: 'spell-check',
      issues: '2 ISSUES FOUND',
      description: [
        "Correct grammar and spelling are essential for creating a professional first impression with employers.",
        "Your resume has very good grammar and spelling overall, with only a couple of minor issues."
      ],
      scorePercent: '90%',
      scoreColor: 'from-purple-400 to-purple-300',
      scoreTitle: 'Nearly Perfect',
      scoreDescription: [
        "We detected 2 grammar issues in your resume that should be corrected.",
        "These minor errors include a subject-verb agreement problem and a misspelled industry term."
      ],
      actionText: "Fix Grammar Issues",
      design: "success", // Custom design indicator
      layout: "minimal" // Layout style
    },
    'action-verbs': {
      title: 'ACTION VERBS',
      icon: 'bolt',
      issues: '4 ISSUES FOUND',
      description: [
        "Strong action verbs at the beginning of bullet points create impact and demonstrate your accomplishments effectively.",
        "Many of your experience descriptions use weak or passive language instead of powerful action verbs."
      ],
      scorePercent: '50%',
      scoreColor: 'from-pink-400 to-pink-300',
      scoreTitle: 'Needs Attention',
      scoreDescription: [
        "Only 8 out of 16 bullet points in your resume start with effective action verbs.",
        "Replace weak phrases like 'responsible for' and 'worked on' with stronger verbs like 'managed', 'developed', or 'implemented'."
      ],
      actionText: "Get Action Verb Suggestions",
      design: "warning", // Custom design indicator
      layout: "list" // Layout style
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveSection(categoryId);
    
    // Scroll to the section when a category is clicked
    if (sectionRefs.current[categoryId]) {
      sectionRefs.current[categoryId].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleActionButtonClick = (section) => {
    setPopupContent({
      title: section.title,
      aiSuggestion: aiSuggestions[section.id] || "No AI suggestions available for this section."
    });
    setPopupOpen(true);
  };

  // Group categories by category type
  const groupedCategories = {};
  scoreCategories.forEach(category => {
    if (!groupedCategories[category.category]) {
      groupedCategories[category.category] = [];
    }
    groupedCategories[category.category].push(category);
  });

  // Dynamic styles based on section design type
  const getSectionStyles = (designType) => {
    switch(designType) {
      case 'error':
        return {
          containerClass: 'bg-red-50 border-l-4 border-red-500',
          iconBgClass: 'bg-red-600',
          issuesClass: 'bg-red-100 text-red-700',
          actionBtnClass: 'bg-red-600 hover:bg-red-700'
        };
      case 'warning':
        return {
          containerClass: 'bg-orange-50 border-l-4 border-orange-500',
          iconBgClass: 'bg-orange-500',
          issuesClass: 'bg-orange-100 text-orange-700',
          actionBtnClass: 'bg-orange-500 hover:bg-orange-600'
        };
      case 'info':
        return {
          containerClass: 'bg-blue-50 border-l-4 border-blue-500',
          iconBgClass: 'bg-blue-600',
          issuesClass: 'bg-blue-100 text-blue-700',
          actionBtnClass: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'success':
        return {
          containerClass: 'bg-green-50 border-l-4 border-green-500',
          iconBgClass: 'bg-green-600',
          issuesClass: 'bg-green-100 text-green-700',
          actionBtnClass: 'bg-green-600 hover:bg-green-700'
        };
      default:
        return {
          containerClass: 'bg-gray-50',
          iconBgClass: 'bg-indigo-600',
          issuesClass: 'bg-gray-100 text-gray-700',
          actionBtnClass: 'bg-indigo-600 hover:bg-indigo-700'
        };
    }
  };
  
  // Render section content based on layout type
  const renderSectionContent = (section, styles, sectionId) => {
    switch(section.layout) {
      case 'split':
        return (
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4 text-left">{section.title}</h3>
              <div className="space-y-4 mb-6">
                {section.description.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 text-left" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                ))}
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mt-2 ${styles.issuesClass}`}>
                  {section.issues}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-left">
              <div className="relative h-3 bg-gray-200 rounded-full mb-6">
                <div 
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${section.scoreColor} rounded-full`} 
                  style={{ width: section.scorePercent }}
                ></div>
                <div 
                  className="absolute -top-6 text-red-500" 
                  style={{ left: section.scorePercent, transform: 'translateX(-50%)' }}
                >
                  <i className="fas fa-map-marker-alt text-xl"></i>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3 text-left">{section.scoreTitle}</h4>
              <div className="space-y-3 mb-4">
                {section.scoreDescription.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-600 text-left">{paragraph}</p>
                ))}
              </div>
              {section.actionText && (
                <a 
                  href="#" 
                  className={`inline-block text-white font-medium py-3 px-6 rounded-lg transition text-sm ${styles.actionBtnClass}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleActionButtonClick({...section, id: sectionId});
                  }}
                >
                  {section.actionText}
                </a>
              )}
            </div>
          </div>
        );
        
      case 'card':
        return (
          <div className="text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className={`${styles.iconBgClass} w-12 h-12 rounded-full flex items-center justify-center`}>
                <i className={`fas fa-${section.icon} text-white text-xl`}></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 text-left">{section.title}</h3>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${styles.issuesClass}`}>
                  {section.issues}
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {section.description.map((paragraph, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-gray-700 text-left" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                </div>
              ))}
              
              {section.scoreDescription.map((paragraph, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-gray-600 text-left">{paragraph}</p>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-full bg-gradient-to-r ${section.scoreColor} rounded-full`} 
                    style={{ width: section.scorePercent }}
                  ></div>
                </div>
                <span className="font-bold text-lg">{section.scorePercent}</span>
              </div>
              
              {section.actionText && (
                <a 
                  href="#" 
                  className={`inline-block text-white font-medium py-2 px-4 rounded-lg transition text-sm ${styles.actionBtnClass}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleActionButtonClick({...section, id: sectionId});
                  }}
                >
                  {section.actionText}
                </a>
              )}
            </div>
          </div>
        );
        
      case 'banner':
        return (
          <div className="text-left">
            <div className={`${styles.containerClass} p-6 rounded-lg mb-6`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <i className={`fas fa-${section.icon} text-2xl`}></i>
                  <h3 className="text-xl font-bold text-left">{section.title}</h3>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${styles.issuesClass}`}>
                  {section.issues}
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {section.description.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 text-left" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                ))}
              </div>
              
              <div className="text-left">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-bold text-gray-800 text-left">{section.scoreTitle}</h4>
                  <span className="text-2xl font-bold">{section.scorePercent}</span>
                </div>
                
                <div className="h-2 bg-gray-200 rounded-full mb-4">
                  <div 
                    className={`h-full bg-gradient-to-r ${section.scoreColor} rounded-full`} 
                    style={{ width: section.scorePercent }}
                  ></div>
                </div>
                
                <div className="space-y-3 mb-4">
                  {section.scoreDescription.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-600 text-left">{paragraph}</p>
                  ))}
                </div>
                
                {section.actionText && (
                  <a 
                    href="#" 
                    className={`inline-block text-white font-medium py-2 px-4 rounded-lg transition text-sm ${styles.actionBtnClass}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleActionButtonClick({...section, id: sectionId});
                    }}
                  >
                    {section.actionText}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'compact':
        return (
          <div className="flex flex-col md:flex-row gap-6 text-left">
            <div className={`${styles.iconBgClass} w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0`}>
              <i className={`fas fa-${section.icon} text-white text-2xl`}></i>
            </div>
            
            <div className="flex-grow text-left">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 text-left">{section.title}</h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${styles.issuesClass}`}>
                    {section.issues}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold block">{section.scorePercent}</span>
                  <span className="text-sm text-gray-500">{section.scoreTitle}</span>
                </div>
              </div>
              
              <div className="h-2 bg-gray-200 rounded-full mb-4 w-full">
                <div 
                  className={`h-full bg-gradient-to-r ${section.scoreColor} rounded-full`} 
                  style={{ width: section.scorePercent }}
                ></div>
              </div>
              
              <div className="space-y-2 mb-4">
                {section.description.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 text-left text-sm" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                ))}
              </div>
              
              <hr className="my-3 border-gray-200" />
              
              <div className="flex justify-between items-center">
                <div className="space-y-1 text-left">
                  {section.scoreDescription.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-600 text-left text-sm">{paragraph}</p>
                  ))}
                </div>
                
                {section.actionText && (
                  <a 
                    href="#" 
                    className={`inline-block text-white font-medium py-2 px-4 rounded-lg transition text-sm ${styles.actionBtnClass}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleActionButtonClick({...section, id: sectionId});
                    }}
                  >
                    {section.actionText}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
        
      case 'dashboard':
        return (
          <div className="text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 text-left">
                <i className={`fas fa-${section.icon} ${styles.iconBgClass} p-2 rounded-md text-white`}></i>
                {section.title}
              </h3>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${styles.issuesClass}`}>
                {section.issues}
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-5 shadow-sm col-span-2 text-left">
                <div className="mb-4">
                  {section.description.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-700 text-left mb-3" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                  ))}
                </div>
                
                {section.actionText && (
                  <div className="text-right">
                    <a 
                      href="#" 
                      className={`inline-block text-white font-medium py-2 px-4 rounded-lg transition text-sm ${styles.actionBtnClass}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleActionButtonClick({...section, id: sectionId});
                      }}
                    >
                      {section.actionText}
                    </a>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-sm flex flex-col justify-between text-left">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center p-1 bg-gray-100 rounded-full w-24 h-24 mb-2">
                    <div className="inline-flex items-center justify-center rounded-full w-20 h-20 bg-gradient-to-b from-gray-50 to-white shadow-inner">
                      <span className="text-2xl font-bold">{section.scorePercent}</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 text-center">{section.scoreTitle}</h4>
                </div>
                
                <div className="space-y-2 text-left">
                  {section.scoreDescription.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-600 text-sm text-left">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'minimal':
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className={`${styles.iconBgClass} w-10 h-10 rounded-md flex items-center justify-center`}>
                <i className={`fas fa-${section.icon} text-white text-lg`}></i>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800 text-left">{section.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full">
                    <div 
                      className={`h-full bg-gradient-to-r ${section.scoreColor} rounded-full`} 
                      style={{ width: section.scorePercent }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{section.scorePercent}</span>
                </div>
              </div>
              <div className="ml-auto">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${styles.issuesClass}`}>
                  {section.issues}
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6 pl-12 text-left">
              {section.description.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 text-left text-sm" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <h4 className="text-base font-bold text-gray-800 mb-3 text-left">{section.scoreTitle}</h4>
              <ul className="space-y-2 list-disc pl-5 mb-4 text-left">
                {section.scoreDescription.map((paragraph, idx) => (
                  <li key={idx} className="text-gray-600 text-sm text-left">{paragraph}</li>
                ))}
              </ul>
              
              {section.actionText && (
                <div className="text-right">
                  <a 
                    href="#" 
                    className={`inline-block text-white font-medium py-1.5 px-3 rounded transition text-xs ${styles.actionBtnClass}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleActionButtonClick({...section, id: sectionId});
                    }}
                  >
                    {section.actionText}
                  </a>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'list':
        return (
          <div className="text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className={`${styles.iconBgClass} w-10 h-10 rounded-md flex items-center justify-center`}>
                <i className={`fas fa-${section.icon} text-white text-lg`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-left">{section.title}</h3>
              <div className="ml-auto flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{section.scorePercent}</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-full bg-gradient-to-r ${section.scoreColor} rounded-full`} 
                      style={{ width: section.scorePercent }}
                    ></div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${styles.issuesClass}`}>
                  {section.issues}
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-4 text-left">
              {section.description.map((paragraph, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 border-b border-gray-100 text-left">
                  <i className="fas fa-info-circle text-gray-400 mt-1"></i>
                  <p className="text-gray-700 text-left" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 text-left">
              <h4 className="text-lg font-bold text-gray-800 mb-2 text-left">{section.scoreTitle}</h4>
              <div className="space-y-3 text-left">
                {section.scoreDescription.map((paragraph, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-left">
                    <i className="fas fa-exclamation-circle text-pink-500 mt-1"></i>
                    <p className="text-gray-600 text-left">{paragraph}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {section.actionText && (
              <div className="flex justify-end">
                <a 
                  href="#" 
                  className={`inline-block text-white font-medium py-2 px-4 rounded-lg transition text-sm ${styles.actionBtnClass}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleActionButtonClick({...section, id: sectionId});
                  }}
                >
                  <i className="fas fa-arrow-right mr-2"></i> {section.actionText}
                </a>
              </div>
            )}
          </div>
        );
        
      default: // standard layout
        return (
          <div className="text-left">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`${styles.iconBgClass} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <i className={`fas fa-${section.icon} text-white text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-left">{section.title}</h3>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${styles.issuesClass}`}>
                {section.issues}
              </div>
            </div>
            
            <div className="space-y-4">
              {section.description.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 text-left" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
              ))}
              
              <div className="bg-white bg-opacity-70 rounded-lg p-6 mt-6 shadow-sm text-left">
                <div className="relative h-3 bg-gray-200 rounded-full mb-8">
                  <div 
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${section.scoreColor} rounded-full`} 
                    style={{ width: section.scorePercent }}
                  ></div>
                  <div 
                    className="absolute -top-6 text-red-500" 
                    style={{ left: section.scorePercent, transform: 'translateX(-50%)' }}
                  >
                    <i className="fas fa-map-marker-alt text-xl"></i>
                  </div>
                </div>
                
                <div className="text-left">
                  <h4 className="text-2xl font-bold text-gray-800 mb-4 text-left">{section.scoreTitle}</h4>
                  <div className="space-y-3 mb-6">
                    {section.scoreDescription.map((paragraph, idx) => (
                      <p key={idx} className="text-gray-600 text-left">{paragraph}</p>
                    ))}
                  </div>
                  {section.actionText && (
                    <div className="text-left">
                      <a 
                        href="#" 
                        className={`inline-block text-white font-medium py-3 px-6 rounded-lg transition text-sm ${styles.actionBtnClass}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleActionButtonClick({...section, id: sectionId});
                        }}
                      >
                        {section.actionText}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen overflow-auto">
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Sidebar/Navbar - Fixed position with max height */}
        <div className="md:w-80 bg-white shadow-lg h-screen overflow-auto sticky top-0">
          {/* Score Summary */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Score</h2>
            <div className="text-4xl font-bold text-orange-400 mb-1">68/100</div>
            <div className="text-sm text-gray-600">25 Issues Found</div>
          </div>

          {/* Navigation Categories - Scrollable */}
          <div className="p-4 overflow-auto">
            {Object.keys(groupedCategories).map(category => (
              <div key={category} className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2 text-center">{category}</h3>
                <div className="space-y-2">
                  {groupedCategories[category].map(item => (
                    <div 
                      key={item.id}
                      className={`cursor-pointer p-3 hover:bg-gray-50 rounded-lg transition-all ${activeSection === item.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''}`}
                      onClick={() => handleCategoryClick(item.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-start gap-3">
                          <i className={`fas fa-${item.icon} ${item.iconColor} text-base mt-1`}></i>
                          <span className="text-gray-700 font-medium text-left">{item.title}</span>
                        </div>
                        <div className={`px-2 py-0.5 text-xs font-medium rounded-full ${item.scoreClass}`}>
                          {item.score}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main Content Area - Scrollable with all sections displayed */}
        <div className="md:flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Display all sections at once with different layouts */}
            {Object.keys(sectionContent).map(sectionId => {
              const section = sectionContent[sectionId];
              const styles = getSectionStyles(section.design);
              
              return (
                <div 
                  key={sectionId} 
                  ref={el => sectionRefs.current[sectionId] = el} 
                  id={`section-${sectionId}`}
                  className={`rounded-xl shadow-lg p-6 ${styles.containerClass}`}
                >
                  {renderSectionContent(section, styles, sectionId)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Import SuggestionPopup from external file */}
      <SuggestionPopup 
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        title={popupContent.title}
        aiSuggestion={popupContent.aiSuggestion}
      />
    </div>
  );
};

export default ResumeScoreAnalysis;