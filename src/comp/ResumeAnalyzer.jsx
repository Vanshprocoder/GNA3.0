import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const ResumeAnalyzer = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const resumeData = {
    candidate: {
      name: "Jane Smith",
      currentRole: "Senior Frontend Developer",
      yearsExperience: 7,
      education: "Master's in Computer Science",
      location: "San Francisco, CA",
      email: "jane.smith@example.com",
      phone: "(555) 123-4567",
      linkedin: "linkedin.com/in/janesmith",
      photoUrl: "/api/placeholder/80/80"
    },
    skillsAnalysis: {
      technical: [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 95 },
        { name: "TypeScript", level: 85 },
        { name: "Node.js", level: 70 },
        { name: "CSS/SCSS", level: 80 },
        { name: "HTML5", level: 90 },
        { name: "Redux", level: 75 }
      ],
      soft: [
        { name: "Communication", level: 85 },
        { name: "Team Leadership", level: 75 },
        { name: "Problem Solving", level: 90 },
        { name: "Project Management", level: 80 },
        { name: "Agile/Scrum", level: 85 }
      ],
      jobMatchPercentage: 87
    },
    experienceInsights: {
      domains: [
        { name: "Frontend Development", years: 7 },
        { name: "UI/UX Design", years: 3 },
        { name: "Team Leadership", years: 2 },
        { name: "Backend Development", years: 1 }
      ],
      educationRelevance: 90,
      roles: [
        { title: "Senior Frontend Developer", company: "TechCorp Inc.", duration: "2021-Present" },
        { title: "Frontend Developer", company: "WebSolutions LLC", duration: "2018-2021" },
        { title: "Junior Developer", company: "StartupXYZ", duration: "2016-2018" }
      ]
    },
    improvements: [
      { date: "2025-03-28 10:30 AM", fileName: "Resume_V1.1.pdf", improvementPercent: 10, notes: "Added quantifiable achievements" },
      { date: "2025-03-27 03:15 PM", fileName: "Resume_V1.0.pdf", improvementPercent: 8, notes: "Improved skills section" },
      { date: "2025-03-26 01:45 PM", fileName: "Resume_V0.9.pdf", improvementPercent: 12, notes: "Enhanced job descriptions" }
    ],
    marketAnalysis: {
      salaryRange: { min: 120000, max: 160000, average: 140000 },
      demandScore: 85,
      competitiveAdvantage: [
        { skill: "React", advantage: "High" },
        { skill: "TypeScript", advantage: "Medium" },
        { skill: "Team Leadership", advantage: "High" }
      ]
    }
  };

  // Data transformation for charts
  const skillsBarData = [
    ...resumeData.skillsAnalysis.technical.slice(0, 5),
    ...resumeData.skillsAnalysis.soft.slice(0, 3)
  ];

  const domainPieData = resumeData.experienceInsights.domains.map(domain => ({
    name: domain.name,
    value: domain.years
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const ProgressBar = ({ value, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="h-2.5 rounded-full" 
        style={{ width: `${value}%`, backgroundColor: color || '#3B82F6' }}
      ></div>
    </div>
  );

  const MetricCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <span className="text-2xl" style={{ color }}>{icon}</span>
      </div>
      <p className="text-3xl font-bold" style={{ color }}>{value}</p>
    </div>
  );

  const TabButton = ({ id, label, activeTab, setActiveTab }) => (
    <button
      className={`py-2 px-4 font-medium rounded-md transition-colors ${
        activeTab === id 
          ? 'bg-indigo-600 text-white' 
          : 'text-gray-700 hover:bg-indigo-100'
      }`}
      onClick={() => setActiveTab(id)}
    >
      {label}
    </button>
  );

  const handleUploadResume = () => {
    navigate('/upload');
  };

  const handleMockInterview = () => {
    navigate('/interview');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg h-screen sticky top-0 p-6 flex flex-col border-r border-gray-200">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-700">ResumeAI</h2>
            <p className="text-sm text-gray-500">Resume Analysis Dashboard</p>
          </div>
          
          <div className="flex flex-col items-center mb-8">
            <img 
              src={resumeData.candidate.photoUrl} 
              alt="Jane Smith" 
              className="w-20 h-20 rounded-full border-2 border-indigo-500 mb-2" 
            />
            <h3 className="font-semibold text-lg">{resumeData.candidate.name}</h3>
            <p className="text-sm text-gray-600">{resumeData.candidate.currentRole}</p>
          </div>
          
          <nav className="flex flex-col space-y-2">
            <TabButton id="overview" label="Overview" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton id="skills" label="Skills Analysis" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton id="experience" label="Experience" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton id="improvements" label="Improvements" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton id="market" label="Market Analysis" activeTab={activeTab} setActiveTab={setActiveTab} />
          </nav>
          
          <div className="mt-auto p-4 bg-indigo-50 rounded-lg border border-indigo-100">
            <p className="text-sm text-indigo-700 font-medium">Job Match Score</p>
            <div className="flex items-center mt-2">
              <div className="w-full mr-3">
                <ProgressBar value={resumeData.skillsAnalysis.jobMatchPercentage} color="#4F46E5" />
              </div>
              <span className="text-indigo-700 font-bold">{resumeData.skillsAnalysis.jobMatchPercentage}%</span>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-8">
          <header className="bg-white rounded-lg shadow-md mb-8 p-6 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Resume Analysis Report</h1>
                <p className="text-gray-600">Last updated: March 28, 2025</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  onClick={handleUploadResume}
                >
                  Upload Resume
                </button>
                <button 
                  className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors"
                  onClick={handleMockInterview}
                >
                  Mock Interview
                </button>
              </div>
            </div>
          </header>
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard 
                  title="Skills Match" 
                  value={`${resumeData.skillsAnalysis.jobMatchPercentage}%`} 
                  icon="⭐" 
                  color="#4F46E5"
                />
                <MetricCard 
                  title="Education Relevance" 
                  value={`${resumeData.experienceInsights.educationRelevance}%`} 
                  icon="🎓" 
                  color="#0891B2"
                />
                <MetricCard 
                  title="Years Experience" 
                  value={resumeData.candidate.yearsExperience} 
                  icon="⏱️" 
                  color="#059669"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Top Skills</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillsBarData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="level" fill="#4F46E5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Experience Distribution</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={domainPieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {domainPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Improvements</h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Improvement</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {resumeData.improvements.map((entry, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{entry.fileName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              +{entry.improvementPercent}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Skills Analysis Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Technical Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {resumeData.skillsAnalysis.technical.map((skill, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm font-medium text-gray-700">{skill.level}%</span>
                      </div>
                      <ProgressBar value={skill.level} color={`hsl(${210 + index * 30}, 70%, 50%)`} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Soft Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {resumeData.skillsAnalysis.soft.map((skill, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm font-medium text-gray-700">{skill.level}%</span>
                      </div>
                      <ProgressBar value={skill.level} color={`hsl(${120 + index * 30}, 70%, 50%)`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Work History</h2>
                <div className="space-y-6">
                  {resumeData.experienceInsights.roles.map((role, index) => (
                    <div key={index} className="pl-4 border-l-4 border-indigo-500">
                      <h3 className="font-semibold text-lg text-gray-800">{role.title}</h3>
                      <p className="text-indigo-600">{role.company}</p>
                      <p className="text-sm text-gray-500">{role.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Domain Experience</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resumeData.experienceInsights.domains}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Years', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="years" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Education</h2>
                <div className="flex items-center">
                  <div className="p-4 bg-indigo-100 rounded-lg">
                    <span className="text-3xl text-indigo-600">🎓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-lg">{resumeData.candidate.education}</h3>
                    <p className="text-gray-600">Relevance to current role: {resumeData.experienceInsights.educationRelevance}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Improvements Tab */}
          {activeTab === 'improvements' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Improvement History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Improvement</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {resumeData.improvements.map((entry, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{entry.fileName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              +{entry.improvementPercent}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.notes}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                            <button className="text-indigo-600 hover:text-indigo-900">Download</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Recommended Improvements</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
                    <h3 className="font-medium text-blue-800">Highlight Quantifiable Achievements</h3>
                    <p className="text-sm text-blue-600">Add more metrics and specific results to demonstrate impact.</p>
                  </div>
                  <div className="p-4 border border-purple-100 rounded-lg bg-purple-50">
                    <h3 className="font-medium text-purple-800">Enhance Technical Skills Section</h3>
                    <p className="text-sm text-purple-600">Add details about specific frameworks and technologies used.</p>
                  </div>
                  <div className="p-4 border border-green-100 rounded-lg bg-green-50">
                    <h3 className="font-medium text-green-800">Add Project Portfolio</h3>
                    <p className="text-sm text-green-600">Include links to GitHub or examples of your best work.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Market Analysis Tab */}
          {activeTab === 'market' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard 
                  title="Average Salary" 
                  value={`$${resumeData.marketAnalysis.salaryRange.average.toLocaleString()}`} 
                  icon="💰" 
                  color="#0E9F6E"
                />
                <MetricCard 
                  title="Market Demand" 
                  value={`${resumeData.marketAnalysis.demandScore}/100`} 
                  icon="📈" 
                  color="#3F83F8"
                />
                <MetricCard 
                  title="Salary Range" 
                  value={`$${resumeData.marketAnalysis.salaryRange.min.toLocaleString()} - $${resumeData.marketAnalysis.salaryRange.max.toLocaleString()}`} 
                  icon="⚖️" 
                  color="#7E3AF2"
                />
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Competitive Advantage</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {resumeData.marketAnalysis.competitiveAdvantage.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-medium text-gray-800">{item.skill}</h3>
                      <div className="mt-2 flex items-center">
                        <span 
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            item.advantage === 'High' 
                              ? 'bg-green-100 text-green-800' 
                              : item.advantage === 'Medium' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.advantage} Advantage
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Market Insights</h2>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-indigo-500 bg-indigo-50">
                    <h3 className="font-medium text-indigo-800">Strong Demand for React Developers</h3>
                    <p className="text-sm text-indigo-600">Your React skills are highly sought after in the current market.</p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h3 className="font-medium text-blue-800">TypeScript Knowledge is Valuable</h3>
                    <p className="text-sm text-blue-600">Companies increasingly require TypeScript for frontend positions.</p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h3 className="font-medium text-purple-800">Team Leadership Premium</h3>
                    <p className="text-sm text-purple-600">Your leadership experience commands a 15-20% salary premium.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
