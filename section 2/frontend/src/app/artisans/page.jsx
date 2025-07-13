'use client';
import React, { useState, useEffect } from 'react';

const LOCAL_KEY = "artisansList";

const Artisans = () => {
  const [artisans, setArtisans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    photo: "",
    location: "",
    experience: "",
    story: "",
    video: "",
    processVideo: "",
    phone: "",
    links: [{ label: "", url: "" }]
  });

  // Load artisans from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setArtisans(JSON.parse(saved));
    }
  }, []);

  // Save artisans to localStorage whenever artisans change
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(artisans));
  }, [artisans]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLinkChange = (idx, field, value) => {
    const newLinks = [...form.links];
    newLinks[idx][field] = value;
    setForm({ ...form, links: newLinks });
  };

  const addLinkField = () => {
    setForm({ ...form, links: [...form.links, { label: "", url: "" }] });
  };

  const removeLinkField = (idx) => {
    const newLinks = form.links.filter((_, i) => i !== idx);
    setForm({ ...form, links: newLinks });
  };

  // Handle image upload (local preview and save as base64)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm({ ...form, photo: ev.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setArtisans([...artisans, form]);
    setShowForm(false);
    setForm({
      name: "",
      photo: "",
      location: "",
      experience: "",
      story: "",
      video: "",
      processVideo: "",
      phone: "",
      links: [{ label: "", url: "" }]
    });
  };

  // Export artisans data as JSON file
  const handleExport = () => {
    const dataStr = JSON.stringify(artisans, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "artisans_backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import artisans data from JSON file
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          setArtisans(imported);
        } else {
          alert("Invalid file format.");
        }
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  // Reset artisans data (clear all)
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all artisan data? This cannot be undone unless you have exported a backup.")) {
      setArtisans([]);
      localStorage.removeItem(LOCAL_KEY);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 py-10 px-2 overflow-y-auto">
      <h1 className="text-center font-extrabold text-4xl mb-10 text-purple-800 drop-shadow-lg tracking-wide">
        Empowering Young Chikankari Artisans
      </h1>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
          onClick={() => setShowForm(true)}
        >
          + Add Your Artisan Profile
        </button>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-blue-700"
          onClick={handleExport}
        >
          Export Data
        </button>
        <label className="bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-green-700 cursor-pointer">
          Import Data
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImport}
          />
        </label>
        <button
          className="bg-red-500 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-red-700"
          onClick={handleReset}
        >
          Reset All Data
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col gap-4 min-w-[340px] max-w-md w-full border-2 border-purple-200"
          >
            <h2 className="text-2xl font-extrabold mb-2 text-purple-700 text-center">Add Artisan Profile</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="border p-2 rounded-lg"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              accept="image/*"
              className="border p-2 rounded-lg"
              onChange={handleImageUpload}
            />
            {form.photo && (
              <img src={form.photo} alt="Preview" className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-pink-200 shadow" />
            )}
            <input
              type="text"
              name="location"
              placeholder="Location (e.g. Lucknow, UP)"
              className="border p-2 rounded-lg"
              value={form.location}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="experience"
              placeholder="Experience (e.g. 3 years)"
              className="border p-2 rounded-lg"
              value={form.experience}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Contact Number"
              className="border p-2 rounded-lg"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="story"
              placeholder="Your Chikankari journey, challenges, aspirations..."
              className="border p-2 rounded-lg"
              value={form.story}
              onChange={handleChange}
              required
            />
            {/* Interview Video Link */}
            <div>
              <label className="block font-semibold mb-1">Interview Video Link</label>
              <input
                type="text"
                name="video"
                placeholder="YouTube Video Link (optional)"
                className="border p-2 rounded-lg w-full mb-2"
                value={form.video}
                onChange={handleChange}
              />
            </div>
            {/* Process Video Link */}
            <div>
              <label className="block font-semibold mb-1">Process Video Link</label>
              <input
                type="text"
                name="processVideo"
                placeholder="YouTube Video Link (optional)"
                className="border p-2 rounded-lg w-full mb-2"
                value={form.processVideo}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="font-semibold mb-1">Your Links (like Linktree):</div>
              {form.links.map((link, idx) => (
                <div key={idx} className="flex gap-2 mb-1">
                  <input
                    type="text"
                    placeholder="Label (e.g. Instagram)"
                    className="border p-2 rounded flex-1"
                    value={link.label}
                    onChange={e => handleLinkChange(idx, "label", e.target.value)}
                  />
                  <input
                    type="url"
                    placeholder="URL"
                    className="border p-2 rounded flex-1"
                    value={link.url}
                    onChange={e => handleLinkChange(idx, "url", e.target.value)}
                  />
                  {form.links.length > 1 && (
                    <button type="button" className="text-red-500" onClick={() => removeLinkField(idx)}>✕</button>
                  )}
                </div>
              ))}
              <button type="button" className="text-blue-600 underline text-sm" onClick={addLinkField}>
                + Add another link
              </button>
            </div>
            <div className="flex gap-2 mt-2 justify-center">
              <button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full font-bold shadow hover:scale-105 transition-transform">Submit</button>
              <button type="button" className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-bold shadow" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <div className="container mx-auto max-w-7xl grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {artisans.map((artisan, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-2 border-purple-100 hover:shadow-2xl transition-shadow min-w-[260px]">
            <div className="relative">
              <img src={artisan.photo} alt={artisan.name} className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-pink-200 shadow-lg" />
              <span className="absolute bottom-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full shadow">#{idx + 1}</span>
            </div>
            <h2 className="text-2xl font-extrabold mb-1 text-purple-700">{artisan.name}</h2>
            <div className="text-sm text-gray-600 mb-2">{artisan.location} • {artisan.experience} experience</div>
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l1.553 1.553a9 9 0 0012.728 0L19 10" />
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="text-gray-700 font-semibold">{artisan.phone}</span>
            </div>
            <p className="mb-3 text-gray-700 text-center italic">{artisan.story}</p>
            {artisan.video && (
              <div className="w-full aspect-video mb-2 rounded-xl overflow-hidden shadow">
                <div className="font-semibold text-purple-700 mb-1">Interview Video</div>
                {artisan.video.startsWith('data:video') ? (
                  <video controls className="w-full h-48 rounded-lg">
                    <source src={artisan.video} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    src={artisan.video}
                    title={artisan.name + " interview"}
                    className="w-full h-48 rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            )}
            {artisan.processVideo && (
              <div className="w-full aspect-video mb-2 rounded-xl overflow-hidden shadow">
                <div className="font-semibold text-pink-700 mb-1">Process Video</div>
                {artisan.processVideo.startsWith('data:video') ? (
                  <video controls className="w-full h-48 rounded-lg">
                    <source src={artisan.processVideo} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    src={artisan.processVideo}
                    title={artisan.name + " process"}
                    className="w-full h-48 rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            )}
            {artisan.links && artisan.links.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {artisan.links.map((link, lidx) => (
                  <a
                    key={lidx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-200 to-pink-100 text-purple-800 px-4 py-1 rounded-full text-xs font-semibold hover:bg-purple-300 shadow"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {artisans.length === 0 && (
        <div className="text-center text-gray-400 mt-16 text-lg">
          No artisans yet. Be the first to add your story!
        </div>
      )}
    </div>
  );
};

export default Artisans;