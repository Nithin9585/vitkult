'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label"; 
import { Textarea } from "@/components/ui/textarea"; 
import { useToast } from '@/hooks/use-toast';
import { useRouter } from "next/navigation";

function TechnicalTeamForm({ name, regNo, email, phoneNumber, branch, selectedTeam }) {
    const [answers, setAnswers] = useState({
        reason: '',
        contribution: '',
        github: '',
        linkedin: '',
        codingProfile: '',
        previousWork: '',  
    });

    const wordLimits = {
        reason: 100, 
        contribution: 100, 
    };

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
        github: answers.github, 
        codingProfile: answers.codingProfile,  
        previousWork: answers.previousWork,  
    };

    const { toast } = useToast(); 
    const router = useRouter(); 

    const handleChange = (e) => {
        const { name, value } = e.target;

        const wordCount = value.trim().split(/\s+/).length;

        if (
            (name === "reason" && wordCount <= wordLimits.reason) ||
            (name === "contribution" && wordCount <= wordLimits.contribution) ||
            !(name === "reason" || name === "contribution")
        ) {
            setAnswers((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = {
            name,
            regNo,
            email,
            phoneNumber,
            branch,
            selectedTeam,
            reason: answers.reason,
            contribution: answers.contribution,
            linkedin: answers.linkedin,
            github: answers.github,
            codingProfile: answers.codingProfile,
            previousWork: answers.previousWork,
        };
    
        try {
            const response = await fetch('/api/uploadformdata', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(formData), 
            });
    
            const data = await response.json(); 
            if (response.ok) {
                console.log('Form Submitted Successfully:', data);
                toast({ title: 'Form submitted successfully!', description: 'Your data has been successfully uploaded.', duration: 3000 });

                router.push('/success'); 
            } else {
                console.error('Error:', data.message);
                toast({ title: 'Error submitting form', description: 'There was an error with your submission. Please try again.', variant: 'destructive', duration: 3000 });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast({ title: 'Unexpected Error', description: 'An unexpected error occurred. Please try again later.', variant: 'destructive', duration: 3000 });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.5, type: 'spring', stiffness: 40, damping: 25 } },
    };

    const formVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 1.5, type: 'spring', stiffness: 60, damping: 25 } },
    };

    const headingVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1, delay: 0.3, ease: "easeOut" } },
    };

    const inputVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.3, ease: "easeOut" } },
    };

    const inputItemVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    };

    const buttonVariants = {
        hover: { scale: 1.05, transition: { duration: 0.3 } },
        tap: { scale: 0.95, transition: { duration: 0.2 } },
        visible: { opacity: 1, transition: { duration: 0.8, delay: 0.5 } },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen flex justify-center m-10" 
        >
            <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="p-8 rounded-lg w-full max-w-3xl"
            >
                <motion.h2
                    variants={headingVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-red-500"
                >
                    Technical Team Form
                </motion.h2>
                <form onSubmit={handleSubmit}>
                    <motion.div variants={inputVariants} initial="hidden" animate="visible">
                        <motion.div variants={inputItemVariants} className="mb-4">
                            <Label className="block text-lg font-medium mb-2">
                                Why do you want to join this club? <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                name="reason"
                                value={answers.reason}
                                onChange={handleChange}
                                className="border-2 rounded-md border-primary-600 p-2 w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                rows="4"
                                required
                            />
                            <div className="text-sm text-gray-400 mt-1">
                                Max {wordLimits.reason} words
                            </div>
                        </motion.div>
                        <motion.div variants={inputItemVariants} className="mb-4">
                            <Label className="block text-lg font-medium mb-2">
                                How will you be able to contribute to the club as a member? <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                name="contribution"
                                value={answers.contribution}
                                onChange={handleChange}
                                className="border-2 rounded-md border-primary-600 p-2 w-full bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                rows="4"
                                required
                            />
                            <div className="text-sm text-gray-400 mt-1">
                                Max {wordLimits.contribution} words
                            </div>
                        </motion.div>
                        <motion.div variants={inputItemVariants} className="mb-4">
                            <Label className="block text-lg font-medium mb-2">
                                GitHub Profile Link <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="url"
                                name="github"
                                value={answers.github}
                                onChange={handleChange}
                                className="border-2 rounded-md border-primary-600 p-2 w-full bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                required
                            />
                        </motion.div>
                        <motion.div variants={inputItemVariants} className="mb-4">
                            <Label className="block text-lg font-medium mb-2">
                                LinkedIn Profile Link <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="url"
                                name="linkedin"
                                value={answers.linkedin}
                                onChange={handleChange}
                                className="border-2 rounded-md border-primary-600 p-2 w-full bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                required
                            />
                        </motion.div>
                        <motion.div variants={inputItemVariants} className="mb-4">
                            <Label className="block text-lg font-medium mb-2">
                                Coding Profile (LeetCode, GFG, CodeChef, etc.) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="url"
                                name="codingProfile"
                                value={answers.codingProfile}
                                onChange={handleChange}
                                className="border-2 rounded-md border-primary-600 p-2 w-full bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                required
                            />
                        </motion.div>
                        <motion.div variants={inputItemVariants} className="mb-4">
                            <Label className="block text-lg font-medium mb-2">
                                Previous Work/Experience <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                name="previousWork"
                                value={answers.previousWork}
                                onChange={handleChange}
                                className="border-2 rounded-md border-primary-600 p-2 w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                rows="4"
                                required
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                        className="w-full flex justify-center"
                    >
                        <Button
                                  type="submit"
                                  className="w-full  text-white bg-gradient-to-r from-yellow-200 to-red-500"
                                >
                                  Submit
                                </Button>
                    </motion.div>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default TechnicalTeamForm;
