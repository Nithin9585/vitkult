'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from '@/hooks/use-toast'; 
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
function OtherTeamForm({ name, regNo, email, phoneNumber, branch, selectedTeam }) {
  const router = useRouter();
  const { toast } = useToast();  
  const [answers, setAnswers] = useState({
    role: "", 
    reason: "",
    contribution: "",
    linkedin: "",
    previousWork: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Other Team Form Submitted");
    console.log("Answers:", answers);  
  
    const formData = {
      name,
      regNo,
      email,
      phoneNumber,
      branch,
      selectedTeam,
      role: answers.role,
      reason: answers.reason,
      contribution: answers.contribution,
      linkedin: answers.linkedin,
      previousWork: answers.previousWork,
    };
  
    try {
      console.log("Sending formData:", formData); 
  
      const response = await fetch('/api/uploadformdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log("Response from server:", response);  
  
      if (response.ok) {
        const data = await response.json(); 
        console.log("Server response data:", data);
        router.push('/success'); 


        toast({
          title: "Success",
          description: "Form submitted and data saved successfully.",
          status: "success",  
          duration: 3000, 
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit the form.",
          status: "error",  
          duration: 3000,
        });
        console.log("Error status:", response.status);  
      }
    } catch (error) {
      console.error("Error during form submission:", error);

      toast({
        title: "Error",
        description: "An error occurred while submitting the form.",
        status: "error", 
        duration: 3000,
      });
    }
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center m-10 bg-primary-900">
      <motion.div className="p-8 rounded-lg w-full max-w-3xl bg-primary-800">
        <motion.h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-red-500">
          Core Team Form
        </motion.h2>
        <form onSubmit={handleSubmit}>
          <motion.div>
            <motion.div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                Select Your Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={answers.role}
                onChange={handleChange}
                className="border-2 rounded-md border-primary-600 p-2 w-full bg-primary-700 focus:ring-2 focus:ring-ivory-500 focus:border-ivory-500"
                required
              >
                <option value="">Select Role</option>
                <option value="Social Media Manager">Social Media</option>
                <option value="Discipline Lead and Volunteer">Discipline Lead and Volunteer</option>
                <option value="PR and Outreach Boys">PR and Outreach</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Editor">Editor</option>
                <option value="Content Writing Technical">Content Writing Technical</option>
                <option value="Content Writing Non-Technical">Content Writing Non-Technical</option>
              </select>
            </motion.div>

            <motion.div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                Why do you want to join this club? <span className="text-red-500">*</span>
              </label>
              <textarea
                name="reason"
                value={answers.reason}
                onChange={handleChange}
                className="border-2 rounded-md border-primary-600 p-2 w-full bg-primary-700 focus:ring-2 focus:ring-ivory-500 focus:border-ivory-500"
                rows="4"
                required
              />
            </motion.div>

            <motion.div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                How will you be able to contribute to the club as a member?{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="contribution"
                value={answers.contribution}
                onChange={handleChange}
                className="border-2 rounded-md border-primary-600 p-2 w-full bg-primary-700 focus:ring-2 focus:ring-ivory-500 focus:border-ivory-500"
                rows="4"
                required
              />
            </motion.div>

            <motion.div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                LinkedIn Profile Link <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="linkedin"
                value={answers.linkedin}
                onChange={handleChange}
                className="border-2 rounded-md border-primary-600 p-2 w-full bg-primary-700 focus:ring-2 focus:ring-ivory-500 focus:border-ivory-500"
                required
              />
            </motion.div>

            <motion.div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                Link to Previous Work (if any)
              </label>
              <input
                type="url"
                name="previousWork"
                value={answers.previousWork}
                onChange={handleChange}
                className="border-2 rounded-md border-primary-600 p-2 w-full bg-primary-700 focus:ring-2 focus:ring-ivory-500 focus:border-ivory-500"
              />
            </motion.div>
          </motion.div>

          <Button
                                            type="submit"
                                            className="w-full  text-white bg-gradient-to-r from-yellow-200 to-red-500"
                                          >
                                            Submit
                                          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default OtherTeamForm;
