'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from '@/hooks/use-toast';  
import TechnicalTeamForm from './Technicalteamform';
import NonTechnical from './NonTechniical';
import Eventmanagement from './Eventmanagement';

function HiringForm() {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [branch, setBranch] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [regNoError, setRegNoError] = useState('');
  const [branchError, setBranchError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  
  const { toast } = useToast(); 
  
  const handleTeamChange = (value) => {
    setSelectedTeam(value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
    setPhoneError('');
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
    setBranchError('');
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRegNoChange = (event) => {
    setRegNo(event.target.value);
  };

  const validateEmail = () => {
    if (!email.endsWith('@vitbhopal.ac.in')) {
      setEmailError('Email must end with @vitbhopal.ac.in');
      return false;
    }
    return true;
  };

  const validatePhone = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Invalid Phone Number");
      return false;
    }
    return true;
  };

  const validateRegistrationNumber = () => {
    const regex = /^[0-9]{2}[A-Za-z]{3}[0-9]{5}$/;
    if (!regex.test(regNo)) {
      setRegNoError('Invalid Registration Number. Must be in the format: 2 digits, 3 characters, 5 digits.');
      return false;
    }
    setRegNoError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isRegNoValid = validateRegistrationNumber();
    const isBranchValid = branch.trim() !== '';

    if (!isBranchValid) {
      setBranchError('Branch is required');
    }

    if (isEmailValid && isPhoneValid && isRegNoValid && isBranchValid) {
      console.log("Form submitted successfully!", {
        name,
        regNo,
        email,
        phone: phoneNumber,
        branch,
        team: selectedTeam,
      });
      toast({ title: 'Form submitted successfully!', description: 'Your data has been submitted.', duration: 3000 });
      setFormSubmitted(true);
    } else {
      console.log("Form has errors. Please correct them.");
      toast({ title: 'Form Submission Failed', description: 'Please correct the errors in the form.', duration: 3000 });
    }
  };

  if (formSubmitted) {
    if (selectedTeam === "Technical Team") {
      return (
        <TechnicalTeamForm
          name={name}
          regNo={regNo}
          email={email}
          phoneNumber={phoneNumber}
          branch={branch}
          selectedTeam={selectedTeam}
        />
      );
    } else if(selectedTeam === "Event Management Team") {
      return (
        <Eventmanagement
          name={name}
          regNo={regNo}
          email={email}
          phoneNumber={phoneNumber}
          branch={branch}
          selectedTeam={selectedTeam}
        />
      );
    }else{
      return (
        <NonTechnical
          name={name}
          regNo={regNo}
          email={email}
          phoneNumber={phoneNumber}
          branch={branch}
          selectedTeam={selectedTeam}
        />
      )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-full lg:max-w-4xl mx-auto p-6 bg-ivory rounded-lg "
    >
      <h1 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-red-500">
        Recruitment Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <Label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-400">
            Name:
          </Label>
          <Input
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="mt-1 w-full p-5 focus:ring-2 focus:ring-yellow-500"
          />
        </motion.div>

        {/* Registration Number Field */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <Label htmlFor="regNo" className="block text-sm font-medium mb-2 text-gray-400">
            Registration Number:
          </Label>
          <Input
            id="regNo"
            value={regNo}
            onChange={handleRegNoChange}
            placeholder="Enter your registration number"
            className="mt-1 w-full p-5 focus:ring-2 focus:ring-yellow-500"
          />
          {regNoError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm mt-1"
            >
              {regNoError}
            </motion.p>
          )}
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col"
        >
          <Label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-400">
            Email ID:
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="mt-1 w-full p-5 focus:ring-2 focus:ring-yellow-500"
          />
          {emailError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm mt-1"
            >
              {emailError}
            </motion.p>
          )}
        </motion.div>

        {/* Phone Number Field */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col"
        >
          <Label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-400">
            Phone Number:
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="Enter your phone number"
            className="mt-1 w-full p-5 focus:ring-2 focus:ring-yellow-500"
          />
          {phoneError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm mt-1"
            >
              {phoneError}
            </motion.p>
          )}
        </motion.div>

        {/* Branch Input */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col"
        >
          <Label htmlFor="branch" className="block text-sm font-medium mb-2 text-gray-400">
            Branch:
          </Label>
          <Input
            id="branch"
            value={branch}
            onChange={handleBranchChange}
            placeholder="Enter your branch"
            className="mt-1 w-full p-5 focus:ring-2 focus:ring-yellow-500"
          />
          {branchError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm mt-1"
            >
              {branchError}
            </motion.p>
          )}
        </motion.div>

        {/* Team Selection */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col"
        >
          <Label className="block text-sm font-medium mb-2 text-gray-400">Select Team:</Label>
          <RadioGroup value={selectedTeam} onValueChange={handleTeamChange}>
            {["Non Technical Team", "Technical Team", "Event Management Team"].map((team) => (
              <div key={team} className="flex items-center mb-4 space-x-2">
                <RadioGroupItem value={team} id={team} />
                <Label htmlFor={team} className="text-sm text-gray-400">
                  {team}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            type="submit"
            className="w-full py-4 text-white bg-gradient-to-r from-yellow-200 to-red-500 hover:scale-105 transition-transform duration-300"
          >
            Submit
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default HiringForm;
