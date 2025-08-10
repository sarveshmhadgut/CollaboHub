import React, { useState } from 'react';
import axios from 'axios';
import { User2, X, PlusCircle, CheckCircle2, AlertCircle, GitPullRequest } from 'lucide-react';

export default function TaskAssignment({ projectId, members, isCreator }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [taskDescription, setTaskDescription] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleMemberSelect = (member) => {
        setSelectedMember(member);
        setError(null);
    };

    const handleAssignTask = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        if (!selectedMember || !taskDescription.trim()) {
            setError('Please select a member and enter a task description');
            setLoading(false);
            return;
        }

        try {
            await axios.post(
                'http://localhost:8080/api/task/assign',
                {
                    assignedTo: selectedMember.id,
                    projectId: projectId,
                    details: taskDescription.trim(),
                    status: 'REQUESTED' // Set initial status as REQUESTED
                },
                { withCredentials: true }
            );

            setSuccess('Task assigned successfully!');
            setTaskDescription('');
            setSelectedMember(null);
            setTimeout(() => {
                setShowModal(false);
                setSuccess(null);
            }, 2000);
        } catch (error) {
            console.error('Error assigning task:', error);
            setError(error.response?.data?.message || 'Failed to assign task');
        } finally {
            setLoading(false);
        }
    };

    if (!isCreator) return null;

    return (
        <div className="">
            <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 bg-white hover:bg-[#0165FF] text-[#0165FF] hover:text-white px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20"
            >
                <PlusCircle className="w-5 h-5" />
                <span>Assign Task</span>
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-black rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center space-x-2">
                                <User2 className="w-6 h-6 text-[#0165FF]" />
                                <h2 className="text-xl font-semibold text-white">Assign New Task</h2>
                            </div>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedMember(null);
                                    setTaskDescription('');
                                    setError(null);
                                }}
                                className="text-white hover:text-red-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAssignTask} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-white">
                                    Select Member
                                </label>
                                <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto p-2 rounded-2xl border border-[#0165FF]">
                                    {members.map((member) => (
                                        <button
                                            key={member.id}
                                            type="button"
                                            onClick={() => handleMemberSelect(member)}
                                            className={`p-3 rounded-2xl transition-all duration-200  ${
                                                selectedMember?.id === member.id
                                                    ? 'bg-white/70 border-2 border-black text-w'
                                                    : 'hover:bg-gray-100 border border-gray-200'
                                            }`}
                                            disabled={loading}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center border border-gray-200 te">
                                                    {member.avatarUrl ? (
                                                        <img
                                                            src={member.avatarUrl}
                                                            alt={member.login}
                                                            className="w-full h-full rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <User2 className="w-4 h-4 text-gray-500" />
                                                    )}
                                                </div>
                                                <span className="font-medium text-gray-900">{member.login}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedMember && (
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-white">
                                        Task Description
                                    </label>
                                    <textarea
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                        className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-3 text-black placeholder-gray-400  transition-all duration-200"
                                        rows="3"
                                        placeholder="Enter task description..."
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            )}

                            {error && (
                                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                                    <AlertCircle className="w-5 h-5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {success && (
                                <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-xl border border-green-200">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span>{success}</span>
                                </div>
                            )}

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedMember(null);
                                        setTaskDescription('');
                                        setError(null);
                                    }}
                                    className="px-4 py-2 text-white hover:text-red-400 transition-colors"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`flex items-center space-x-2 bg-white hover:bg-[#0165FF] text-[#0165FF] hover:text-white px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20 ${
                                        loading || !selectedMember ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    disabled={loading || !selectedMember}
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            <span>Assigning...</span>
                                        </>
                                    ) : (
                                        <>
                                            <PlusCircle className="w-5 h-5" />
                                            <span>Assign Task</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
