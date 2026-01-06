"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Share2, Clock, FileText, ChevronDown, MoreVertical, Folder } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

interface Page {
  id: number;
  content: string;
}

interface Project {
  id: number;
  name: string;
  lastEdited: string;
  format: string;
  pages: Page[];
}

interface History {
  [key: string]: string[];
}

interface HistoryIndex {
  [key: string]: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    { 
      id: 1, 
      name: 'Research Paper - AI Ethics', 
      lastEdited: '2 hours ago', 
      format: 'Essay',
      pages: [
        { id: 1, content: 'This research paper explores the ethical implications of artificial intelligence in modern society. As AI systems become more prevalent...' },
        { id: 2, content: 'The ethical framework for AI development must consider multiple stakeholders and perspectives...' },
        { id: 3, content: 'In conclusion, the development of ethical AI requires ongoing dialogue and collaboration...' }
      ]
    },
    { 
      id: 2, 
      name: 'Database Schema Design', 
      lastEdited: '1 day ago', 
      format: 'Technical Doc',
      pages: [
        { id: 1, content: 'Database design principles and normalization strategies are fundamental to creating efficient systems...' },
        { id: 2, content: 'Entity-Relationship diagrams help visualize the database structure...' },
        { id: 3, content: 'Indexing strategies can significantly improve query performance...' }
      ]
    },
    { 
      id: 3, 
      name: 'Study Notes - React Hooks', 
      lastEdited: '3 days ago', 
      format: 'Notes',
      pages: [
        { id: 1, content: 'useState allows functional components to have state. Basic syntax: const [state, setState] = useState(initialValue)...' },
        { id: 2, content: 'useEffect handles side effects in functional components. It runs after every render by default...' },
        { id: 3, content: 'Custom hooks let you extract component logic into reusable functions...' }
      ]
    },
    { 
      id: 4, 
      name: 'Project Proposal', 
      lastEdited: '1 week ago', 
      format: 'Business',
      pages: [
        { id: 1, content: 'Executive summary for the new learning management system. This proposal outlines the vision...' },
        { id: 2, content: 'Market analysis shows significant demand for modern educational platforms...' },
        { id: 3, content: 'Budget breakdown and timeline for implementation...' }
      ]
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showFormatMenu, setShowFormatMenu] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('Blank');
  const [currentPage, setCurrentPage] = useState(1);
  const [history, setHistory] = useState<History>({});
  const [historyIndex, setHistoryIndex] = useState<HistoryIndex>({});

  const updateContentRef = useRef<((content: string) => void) | null>(null);

  const formats = [
    { name: 'Blank', description: 'Start from scratch' },
    { name: 'Essay', description: 'Academic essay format' },
    { name: 'Notes', description: 'Study notes template' },
    { name: 'Technical Doc', description: 'Technical documentation' },
    { name: 'Business', description: 'Business document' },
    { name: 'Report', description: 'Formal report template' }
  ];

  // Template content for each format
  const formatTemplates: Record<string, string[]> = {
    'Blank': ['', '', ''],
    'Essay': [
      'Introduction: State your thesis and outline your main points.',
      'Body: Develop your arguments with evidence and analysis.',
      'Conclusion: Summarize your findings and restate your thesis.'
    ],
    'Notes': [
      'Key Concept 1: ...',
      'Key Concept 2: ...',
      'Summary/Reflection: ...'
    ],
    'Technical Doc': [
      'Overview: Describe the purpose and scope of the document.',
      'Implementation Details: Provide technical specifications and instructions.',
      'Appendix: Add diagrams, references, or additional notes.'
    ],
    'Business': [
      'Executive Summary: ...',
      'Market Analysis: ...',
      'Budget/Timeline: ...'
    ],
    'Report': [
      'Abstract: ...',
      'Main Content: ...',
      'Conclusion/Recommendations: ...'
    ]
  };

  const createNewProject = () => {
    if (newProjectName.trim()) {
      const template = formatTemplates[selectedFormat] || formatTemplates['Blank'];
      const newProject = {
        id: Date.now(),
        name: newProjectName,
        lastEdited: 'Just now',
        format: selectedFormat,
        pages: [
          { id: 1, content: template[0] },
          { id: 2, content: template[1] },
          { id: 3, content: template[2] }
        ]
      };
      setProjects([newProject, ...projects]);
      setNewProjectName('');
      setShowNewProject(false);
      setSelectedProject(newProject);
      setCurrentPage(1);
    }
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  const addPage = () => {
    if (selectedProject) {
      const newPageId = selectedProject.pages.length + 1;
      const updatedProject = {
        ...selectedProject,
        pages: [...selectedProject.pages, { id: newPageId, content: '' }]
      };
      setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p));
      setSelectedProject(updatedProject);
      setCurrentPage(newPageId);
    }
  };

  const updateContent = (content: string) => {
    if (updateContentRef.current) {
      updateContentRef.current(content);
    }
  };

  const getCurrentPageContent = () => {
    if (!selectedProject) return '';
    const page = selectedProject.pages.find(p => p.id === currentPage);
    return page ? page.content : '';
  };

  const saveToHistory = (projectId: number, pageId: number, content: string) => {
    const key = `${projectId}-${pageId}`;
    const currentHistory = history[key] || [];
    const currentIndex = historyIndex[key] ?? -1;
    
    // Remove any future history if we're not at the end
    const newHistory = currentHistory.slice(0, currentIndex + 1);
    newHistory.push(content);
    
    // Limit history to last 50 states
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    setHistory({ ...history, [key]: newHistory });
    setHistoryIndex({ ...historyIndex, [key]: newHistory.length - 1 });
  };

  const undo = () => {
    if (!selectedProject) return;
    
    const key = `${selectedProject.id}-${currentPage}`;
    const currentHistory = history[key] || [];
    const currentIndex = historyIndex[key] ?? -1;
    
    if (currentIndex > 0) {
      const previousContent = currentHistory[currentIndex - 1];
      const updatedPages = selectedProject.pages.map(page =>
        page.id === currentPage ? { ...page, content: previousContent } : page
      );
      const updatedProject = {
        ...selectedProject,
        pages: updatedPages,
        lastEdited: 'Just now'
      };
      setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p));
      setSelectedProject(updatedProject);
      setHistoryIndex({ ...historyIndex, [key]: currentIndex - 1 });
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    updateContentRef.current = (content: string) => {
      if (selectedProject) {
        const updatedPages = selectedProject.pages.map(page =>
          page.id === currentPage ? { ...page, content } : page
        );
        const updatedProject = {
          ...selectedProject,
          pages: updatedPages,
          lastEdited: 'Just now'
        };
        setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p));
        setSelectedProject(updatedProject);
        
        // Debounce history saving - only save after 500ms of no typing
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          saveToHistory(selectedProject.id, currentPage, content);
        }, 500);
      }
    };
    
    return () => clearTimeout(timeoutId);
  }, [selectedProject, currentPage, projects]);

  // Initialize history when opening a page
  useEffect(() => {
    if (selectedProject && currentPage) {
      const key = `${selectedProject.id}-${currentPage}`;
      if (!history[key]) {
        const content = getCurrentPageContent();
        setHistory({ ...history, [key]: [content] });
        setHistoryIndex({ ...historyIndex, [key]: 0 });
      }
    }
  }, [selectedProject?.id, currentPage]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey && selectedProject) {
        e.preventDefault();
        undo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, currentPage, history, historyIndex]);

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex h-[calc(100vh-73px)]">
        <Sidebar active="Notes" />
        <div className="flex-1">
          <div className="p-4">
            <button
              onClick={() => setShowNewProject(true)}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
            >
              <Plus className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-gray-700">New Project</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4">
            <div className="mb-2 px-2 text-xs font-semibold text-gray-500 uppercase">
              Recent Projects
            </div>
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                  selectedProject?.id === project.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{project.name}</div>
                  <div className="text-xs text-gray-500">{project.lastEdited}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {selectedProject ? (
            /* Document Editor */
            <div className="h-full flex flex-col bg-gray-100">
              {/* Toolbar */}
              <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
                <button className="px-3 py-1 text-sm hover:bg-gray-100 rounded">File</button>
                <button className="px-3 py-1 text-sm hover:bg-gray-100 rounded">Edit</button>
                <button className="px-3 py-1 text-sm hover:bg-gray-100 rounded">View</button>
                <button className="px-3 py-1 text-sm hover:bg-gray-100 rounded">Insert</button>
                <button className="px-3 py-1 text-sm hover:bg-gray-100 rounded">Format</button>
                
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {selectedProject.pages.length}
                  </span>
                  <button
                    onClick={addPage}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <Plus className="w-4 h-4" />
                    Add Page
                  </button>
                </div>
              </div>

              {/* Page Navigation */}
              {selectedProject.pages.length > 1 && (
                <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center gap-2 overflow-x-auto">
                  {selectedProject.pages.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => setCurrentPage(page.id)}
                      className={`px-3 py-1 text-sm rounded ${
                        currentPage === page.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Page {page.id}
                    </button>
                  ))}
                </div>
              )}

              {/* Editor Area */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto bg-white shadow-lg" style={{ minHeight: '11in' }}>
                  <div className="p-16">
                    <textarea
                      value={getCurrentPageContent()}
                      onChange={(e) => updateContent(e.target.value)}
                      placeholder="Start typing..."
                      className="w-full h-full min-h-[800px] text-gray-900 focus:outline-none resize-none"
                      style={{ fontFamily: 'Georgia, serif', fontSize: '12pt', lineHeight: '1.8' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Project Gallery */
            <div className="p-8 overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Start a new project</h2>
                  <p className="text-gray-600">Choose a template to get started</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {formats.slice(0, 3).map((format) => (
                    <div
                      key={format.name}
                      onClick={() => {
                        setSelectedFormat(format.name);
                        setShowNewProject(true);
                      }}
                      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                    >
                      <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center border-b border-gray-200">
                        <FileText className="w-16 h-16 text-blue-400" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{format.name}</h3>
                        <p className="text-sm text-gray-600">{format.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Projects</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => {
                        setSelectedProject(project);
                        setCurrentPage(1);
                      }}
                      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                    >
                      <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border-b border-gray-200 p-4">
                        <div className="w-full h-full bg-white rounded shadow-sm flex items-center justify-center">
                          <FileText className="w-12 h-12 text-gray-300" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">{project.name}</h3>
                        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                          <span>{project.format}</span>
                          <span>{project.pages.length} pages</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {project.lastEdited}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteProject(project.id);
                            }}
                            className="flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded text-xs"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Project</h2>
            
            <input
              type="text"
              placeholder="Project name..."
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createNewProject()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              autoFocus
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose a format
              </label>
              <div className="grid grid-cols-2 gap-3">
                {formats.map((format) => (
                  <div
                    key={format.name}
                    onClick={() => setSelectedFormat(format.name)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedFormat === format.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{format.name}</div>
                    <div className="text-sm text-gray-600">{format.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={createNewProject}
                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
              >
                Create Project
              </button>
              <button
                onClick={() => {
                  setShowNewProject(false);
                  setNewProjectName('');
                  setSelectedFormat('Blank');
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}