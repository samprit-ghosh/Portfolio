import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProject, updateProject, deleteProject, fetchProjects } from '../store/slices/projectSlice';
import { addSkill, updateSkill, deleteSkill, fetchSkills } from '../store/slices/skillSlice';
import { addCertificate, updateCertificate, deleteCertificate, fetchCertificates } from '../store/slices/certificateSlice';
import { Plus, Edit2, Trash2, X, Layout, Code, LogOut, ChevronRight, Image as ImageIcon, Link as LinkIcon, AlertCircle, Award, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../store/slices/authSlice';
import { useToast } from '../components/Toast';

const AdminPanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const { isAuthenticated } = useSelector(state => state.auth);
    const { items: projects } = useSelector(state => state.projects);
    const { items: skills } = useSelector(state => state.skills);
    const { items: certificates } = useSelector(state => state.certificates);

    const [activeTab, setActiveTab] = useState('projects');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null); // ID of item to delete
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin/login');
        } else {
            dispatch(fetchProjects());
            dispatch(fetchSkills());
            dispatch(fetchCertificates());
        }
    }, [isAuthenticated, navigate, dispatch]);

    const handleOpenModal = (item = null) => {
        setEditingItem(item);
        setFormData(item || { percentage: 50 });
        setSelectedFile(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Use FormData for file upload
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'image' && key !== 'file') { // image/file is handled separately if file is selected
                data.append(key, formData[key]);
            }
        });
        
        if (selectedFile) {
            data.append(activeTab === 'certificates' ? 'file' : 'image', selectedFile);
        } else if (formData.image || formData.pdfUrl) {
            data.append(activeTab === 'certificates' ? 'file' : 'image', formData.image || formData.pdfUrl); 
        }
        
        let action;
        if (activeTab === 'projects') {
            action = editingItem ? updateProject({ id: editingItem._id, projectData: data }) : addProject(data);
        } else if (activeTab === 'skills') {
            action = editingItem ? updateSkill({ id: editingItem._id, skillData: data }) : addSkill(data);
        } else {
            action = editingItem ? updateCertificate({ id: editingItem._id, certificateData: data }) : addCertificate(data);
        }

        toast.promise(
            dispatch(action).unwrap(),
            {
                loading: selectedFile ? 'Uploading to Google Drive...' : 'Saving...',
                success: `${activeTab.slice(0, -1)} saved successfully!`,
                error: (err) => `Error: ${err.message || 'Failed to save'}`,
            }
        );

        handleCloseModal();
    };

    const handleDeleteClick = (id) => {
        setDeleteConfirm(id);
    };

    const confirmDelete = async () => {
        if (deleteConfirm) {
            let action;
            if (activeTab === 'projects') action = deleteProject(deleteConfirm);
            else if (activeTab === 'skills') action = deleteSkill(deleteConfirm);
            else action = deleteCertificate(deleteConfirm);
            
            toast.promise(
                dispatch(action).unwrap(),
                {
                    loading: 'Deleting...',
                    success: 'Item deleted successfully!',
                    error: 'Failed to delete item.',
                }
            );
            setDeleteConfirm(null);
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen pt-20 md:pt-28 pb-12 px-4 md:px-6 bg-dark">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black mb-2 flex items-center gap-3">
                            <span className="gradient-text">Admin</span> Dashboard
                        </h1>
                        <p className="text-gray-500">Manage your projects, skills, and portfolio data.</p>
                    </div>
                    <div className="flex flex-row md:flex-row w-full md:w-auto gap-3">
                        <button
                            onClick={() => handleOpenModal()}
                            className="btn-primary flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-6 text-sm"
                        >
                            <Plus size={18} /> Create
                        </button>
                        <button
                            onClick={() => {
                                dispatch(logout());
                                toast.success('Logged out successfully');
                            }}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 p-3 rounded-xl transition-all"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 p-1 bg-white/5 rounded-2xl mb-8 w-full md:w-fit border border-white/10 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-xl transition-all font-bold text-sm md:text-base ${activeTab === 'projects' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Layout size={18} /> Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('skills')}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-xl transition-all font-bold text-sm md:text-base ${activeTab === 'skills' ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Code size={18} /> Skills
                    </button>
                    <button
                        onClick={() => setActiveTab('certificates')}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-xl transition-all font-bold text-sm md:text-base ${activeTab === 'certificates' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Award size={18} /> Certificates
                    </button>
                </div>

                {/* Content Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {(activeTab === 'projects' ? projects : activeTab === 'skills' ? skills : certificates).map((item) => (
                            <motion.div
                                key={item._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="glass rounded-2xl p-6 group relative overflow-hidden border border-white/5 hover:border-primary/20 transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold truncate pr-10">
                                        {activeTab === 'projects' ? item.title : item.name}
                                    </h3>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleOpenModal(item)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-primary">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDeleteClick(item._id)} className="p-2 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors text-red-500">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                
                                {activeTab === 'projects' ? (
                                    <div className="space-y-4">
                                        <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                                        <div className="flex items-center gap-3 text-xs text-primary font-bold bg-primary/5 p-2 rounded-lg border border-primary/10">
                                            <LinkIcon size={14} /> 
                                            <span className="truncate">{item.link}</span>
                                        </div>
                                    </div>
                                ) : activeTab === 'skills' ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Proficiency Level</span>
                                            <span className="text-secondary font-black">{item.percentage}%</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-secondary" style={{ width: `${item.percentage}%` }} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-xs text-amber-500 font-bold bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
                                            <FileText size={14} /> 
                                            <span className="truncate">{item.issuer || 'Personal Certification'}</span>
                                        </div>
                                        <p className="text-gray-500 text-xs truncate">{item.pdfUrl}</p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {(activeTab === 'projects' ? projects : activeTab === 'skills' ? skills : certificates).length === 0 && (
                    <div className="text-center py-20 glass rounded-3xl border-dashed border-2 border-white/10">
                        <AlertCircle size={48} className="mx-auto text-gray-700 mb-4" />
                        <h3 className="text-xl font-bold text-gray-500">No {activeTab} found.</h3>
                        <p className="text-gray-600 mb-8">Start by adding your first {activeTab.slice(0, -1)} to show off your work!</p>
                        <button onClick={() => handleOpenModal()} className="btn-secondary">
                            Add First {activeTab.slice(0, -1)}
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/90 backdrop-blur-md"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass w-full max-w-2xl rounded-[2rem] p-6 md:p-10 relative max-h-[90vh] overflow-y-auto no-scrollbar border border-white/10"
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center mb-6 md:mb-8 sticky top-0 bg-dark/20 backdrop-blur-md py-2 z-10">
                                <h2 className="text-2xl md:text-3xl font-black">
                                    <span className="gradient-text">{editingItem ? 'Edit' : 'Create'}</span> {activeTab === 'projects' ? 'Project' : activeTab === 'skills' ? 'Skill' : 'Certificate'}
                                </h2>
                                <button onClick={handleCloseModal} className="p-2 hover:bg-white/10 rounded-xl transition-all text-gray-400">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {activeTab === 'projects' ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest">Project Title</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                                                    value={formData.title || ''}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    placeholder="e.g. XCart E-commerce"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest">Category</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                                                    value={formData.category || ''}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    placeholder="e.g. Full Stack"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest">Description</label>
                                            <textarea
                                                required
                                                rows="3"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none resize-none"
                                                value={formData.description || ''}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="Describe the project goal and tech used..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest">Project Image</label>
                                                {(selectedFile || formData.image) && (
                                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/10">
                                                        <img 
                                                            src={selectedFile ? URL.createObjectURL(selectedFile) : formData.image} 
                                                            alt="Preview" 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="relative group/file">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                                    className="hidden"
                                                    id="project-image-upload"
                                                />
                                                <label 
                                                    htmlFor="project-image-upload"
                                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-all"
                                                >
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <ImageIcon className="w-8 h-8 mb-3 text-gray-500 group-hover/file:text-primary transition-colors" />
                                                        <p className="mb-2 text-sm text-gray-500 font-bold">
                                                            {selectedFile ? selectedFile.name : (formData.image ? 'Change Image' : 'Upload Image')}
                                                        </p>
                                                        <p className="text-xs text-gray-600">PNG, JPG or WEBP</p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest">Live Link</label>
                                            <div className="relative">
                                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                                                    value={formData.link || ''}
                                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                                    placeholder="https://example.com"
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : activeTab === 'skills' ? (
                                    <>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest">Skill Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary outline-none"
                                                value={formData.name || ''}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g. React.js"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest">Skill Icon</label>
                                                {(selectedFile || formData.image) && (
                                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary/30 shadow-lg shadow-secondary/10">
                                                        <img 
                                                            src={selectedFile ? URL.createObjectURL(selectedFile) : formData.image} 
                                                            alt="Preview" 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="relative group/file">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                                    className="hidden"
                                                    id="skill-image-upload"
                                                />
                                                <label 
                                                    htmlFor="skill-image-upload"
                                                    className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-secondary/50 hover:bg-white/5 transition-all"
                                                >
                                                    <div className="flex flex-col items-center justify-center py-4">
                                                        <ImageIcon className="w-6 h-6 mb-2 text-gray-500 group-hover/file:text-secondary transition-colors" />
                                                        <p className="text-xs text-gray-500 font-bold">
                                                            {selectedFile ? selectedFile.name : (formData.image ? 'Change Icon' : 'Upload Icon')}
                                                        </p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest">Percentage</label>
                                                <span className="text-2xl font-black text-secondary">{formData.percentage || 0}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                className="w-full h-3 bg-white/5 rounded-full appearance-none cursor-pointer accent-secondary border border-white/10"
                                                value={formData.percentage || 0}
                                                onChange={(e) => setFormData({ ...formData, percentage: parseInt(e.target.value) })}
                                            />
                                            <div className="flex justify-between text-xs text-gray-600 font-bold uppercase tracking-tighter">
                                                <span>Beginner</span>
                                                <span>Intermediate</span>
                                                <span>Advanced</span>
                                                <span>Expert</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest">Certificate Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                                                value={formData.name || ''}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g. Meta Front-End Developer"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest">Issuer</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                                                    value={formData.issuer || ''}
                                                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                                                    placeholder="e.g. Coursera"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest">Date</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                                                    value={formData.date || ''}
                                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                    placeholder="e.g. Oct 2024"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4">
                                            <div className="space-y-2">
                                                <label className={`block text-sm font-bold uppercase tracking-widest ${selectedFile ? 'text-gray-700' : 'text-gray-500'}`}>
                                                    Option 1: External Link (HTTPS)
                                                </label>
                                                <div className="relative">
                                                    <LinkIcon className={`absolute left-4 top-1/2 -translate-y-1/2 ${selectedFile ? 'text-gray-800' : 'text-gray-600'}`} size={18} />
                                                    <input
                                                        type="url"
                                                        disabled={!!selectedFile}
                                                        className={`w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none transition-all ${selectedFile ? 'opacity-20 cursor-not-allowed' : ''}`}
                                                        value={formData.pdfUrl || ''}
                                                        onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                                                        placeholder="https://coursera.org/verify/..."
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 py-2">
                                                <div className="h-px bg-white/5 flex-1" />
                                                <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.2em]">OR</span>
                                                <div className="h-px bg-white/5 flex-1" />
                                            </div>

                                            <div className="space-y-2">
                                                <label className={`block text-sm font-bold uppercase tracking-widest ${formData.pdfUrl?.startsWith('http') ? 'text-gray-700' : 'text-gray-500'}`}>
                                                    Option 2: Upload PDF File
                                                </label>
                                                <div className={`relative group/file transition-all ${formData.pdfUrl?.startsWith('http') ? 'opacity-20 pointer-events-none' : ''}`}>
                                                    <input
                                                        type="file"
                                                        accept=".pdf"
                                                        disabled={!!(formData.pdfUrl && formData.pdfUrl.startsWith('http'))}
                                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                                        className="hidden"
                                                        id="cert-file-upload"
                                                    />
                                                    <label 
                                                        htmlFor="cert-file-upload"
                                                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-amber-500/50 hover:bg-white/5 transition-all ${selectedFile ? 'border-amber-500/50 bg-amber-500/5' : ''}`}
                                                    >
                                                        <div className="flex flex-col items-center justify-center py-4">
                                                            <FileText className={`w-8 h-8 mb-2 transition-colors ${selectedFile ? 'text-amber-500' : 'text-gray-500'}`} />
                                                            <p className={`text-sm font-bold ${selectedFile ? 'text-white' : 'text-gray-500'}`}>
                                                                {selectedFile ? selectedFile.name : 'Upload PDF Certificate'}
                                                            </p>
                                                            {selectedFile && (
                                                                <button 
                                                                    type="button"
                                                                    onClick={(e) => { e.preventDefault(); setSelectedFile(null); }}
                                                                    className="mt-2 text-[10px] font-black text-red-500 uppercase hover:underline"
                                                                >
                                                                    Remove File
                                                                </button>
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="pt-8">
                                    <button type="submit" className={`w-full py-5 text-xl font-black rounded-2xl transition-all shadow-xl ${activeTab === 'projects' ? 'bg-primary shadow-primary/20' : activeTab === 'skills' ? 'bg-secondary shadow-secondary/20' : 'bg-amber-500 shadow-amber-500/20'}`}>
                                        {editingItem ? 'SAVE CHANGES' : `CREATE ${activeTab.toUpperCase().slice(0, -1)}`}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteConfirm && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-dark/95 backdrop-blur-xl"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass w-full max-w-md rounded-[2rem] p-6 md:p-8 border border-red-500/20 text-center"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                                <Trash2 size={32} className="md:w-10 md:h-10" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-black mb-4">Are you sure?</h2>
                            <p className="text-gray-400 mb-8">
                                This action is permanent and cannot be undone. All data associated with this {activeTab.slice(0, -1)} will be lost.
                            </p>
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={confirmDelete}
                                    className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-black rounded-2xl transition-all shadow-lg shadow-red-500/20"
                                >
                                    YES, DELETE ITEM
                                </button>
                                <button 
                                    onClick={() => setDeleteConfirm(null)}
                                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all"
                                >
                                    CANCEL
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanel;
