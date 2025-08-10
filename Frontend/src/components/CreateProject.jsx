import React, { useState } from "react";
import axios from "axios";
import techstack from "./TechStack/Techstack";
import { Plus, X, Code2 } from 'lucide-react';

function CreateProject({ onProjectCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    techStack: new Set(),
  });
  const [newTech, setNewTech] = useState("");
  const [techSuggestions, setTechSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechInputChange = (e) => {
    const value = e.target.value;
    setNewTech(value);
    if (value.length > 0) {
      const filtered = techstack.filter((tech) =>
        tech.toLowerCase().includes(value.toLowerCase())
      );
      setTechSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setTechSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleAddTech = (e) => {
    e.preventDefault();
    if (newTech && techstack.includes(newTech.toUpperCase())) {
      setFormData((prev) => ({
        ...prev,
        techStack: new Set([...prev.techStack, newTech.toUpperCase()]),
      }));
      setNewTech("");
      setShowSuggestions(false);
    }
  };

  const handleRemoveTech = (tech) => {
    setFormData((prev) => ({
      ...prev,
      techStack: new Set([...prev.techStack].filter((t) => t !== tech)),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectDTO = {
        projectName: formData.name,
        description: formData.description,
        techStack: Array.from(formData.techStack),
      };

      const response = await axios.post(
        "http://localhost:8080/api/project/create",
        projectDTO,
        { withCredentials: true }
      );

      if (onProjectCreated) {
        onProjectCreated(response.data);
      }

      setFormData({
        name: "",
        description: "",
        techStack: new Set(),
      });
      setError(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error("Error creating project:", error);
      setError(error.response?.data?.message || "Failed to create project");
      setSuccess(false);
    }
  };

  return (
    <div className="rounded-2xl shadow-lg p-8">

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-6 py-4 rounded-2xl mb-6 backdrop-blur-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/20 border border-green-500/30 text-green-200 px-6 py-4 rounded-2xl mb-6 backdrop-blur-sm">
          Project created successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Project Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-black/15 border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-white placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-black/15 border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-white placeholder-gray-400"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tech Stack
          </label>
          <div className="flex space-x-3">
            <input
              type="text"
              value={newTech}
              onChange={handleTechInputChange}
              placeholder="Search technology..."
              className="flex-1 px-4 py-3 bg-black/15 border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-white placeholder-gray-400"
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="bg-white text-[#0165FF] px-6 py-3 rounded-2xl hover:bg-[#0165FF] hover:text-white transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 backdrop-blur-sm"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {showSuggestions && techSuggestions.length > 0 && (
            <div className="mt-2 bg-white/10 border border-white/20 rounded-2xl shadow-lg max-h-60 overflow-y-auto backdrop-blur-sm">
              {techSuggestions.map((tech) => (
                <div
                  key={tech}
                  onClick={() => {
                    setNewTech(tech);
                    setShowSuggestions(false);
                  }}
                  className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors text-white"
                >
                  {tech}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from(formData.techStack).map((tech) => (
            <div
              key={tech}
              className="group bg-indigo-500/20 text-indigo-200 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 border border-indigo-500/30"
            >
              <Code2 className="w-4 h-4" />
              <span>{tech}</span>
              <button
                type="button"
                onClick={() => handleRemoveTech(tech)}
                className="text-indigo-200 hover:text-white transition-colors"
                title="Remove technology"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-white hover:bg-[#0165FF] text-[#0165FF] hover:text-white px-6 py-3 rounded-2xl transition-colors backdrop-blur-sm flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Project</span>
        </button>
      </form>
    </div>
  );
}

export default CreateProject;
