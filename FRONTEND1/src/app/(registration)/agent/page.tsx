// app/agent-register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AgentRegistrationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    agencyName: "",
    licenseNumber: "",
    state: "",
    city: "",
    username: "",
    password: "",
    confirmPassword: "",
    profilePicture: null as File | null,
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: e.target.files![0],
      }));
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    } else if (step === 2) {
      if (!formData.name) newErrors.name = "full name is required";
    } else if (step === 3) {
      if (!formData.agencyName)
        newErrors.agencyName = "Agency/Organization name is required";
    } else if (step === 3) {
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.city) newErrors.city = "City is required";
    } else if (step === 4) {
      if (!formData.profilePicture)
        newErrors.profilePicture = "Profile picture is required";
    } else if (step === 5) {
      if (!formData.username) newErrors.username = "Username is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      if (
        formData.password &&
        formData.confirmPassword &&
        formData.password !== formData.confirmPassword
      ) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (!formData.acceptTerms)
        newErrors.acceptTerms = "You must accept the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 5) {
        setStep(step + 1);
      } else {
        
        
        const payload = {
          name: formData.name,
          email: formData.email,
          agencyName: formData.agencyName,
          licenseNumber: formData.licenseNumber,
          state: formData.state,
          city: formData.city,
          username: formData.username,
          password: formData.password,
          profilePicture: formData.profilePicture?.name || "",
        };

        console.log("Form submission data:", payload);
        // router.push('/agent-dashboard');
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      agencyName: formData.agencyName,
      licenseNumber: formData.licenseNumber,
      state: formData.state,
      city: formData.city,
      username: formData.username,
      password: formData.password,
      profilePicture: formData.profilePicture?.name || "",
      acceptTerms: formData.acceptTerms,
      registrationDate: new Date().toISOString(),
    };
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/auth/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("Registration successful");
        router.push("/login");
      } else {
        alert(data.msg || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div className="bg-gray-50 block"><img src="/logo.png" alt="logo" width={80}   /></div>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Agent Registration
              </h2>
              <div className="mt-8">
                {/* Improved progress bar with connected lines */}
                <div className="relative">
                  <div className="absolute top-1/2 left-1 right-0 h-1 bg-gray-200 -translate-y-2"></div>
                  <div
                    className="absolute top-1/2 left-0 h-1 bg-green-600 -translate-y-2 transition-all duration-300"
                    style={{ width: `${(step - 1) * 25}%` }}
                  ></div>
                  <div className="flex justify-between relative">
                    {[1, 2, 3, 4, 5].map((stepNumber) => (
                      <div
                        key={stepNumber}
                        className="flex flex-col items-center"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                            stepNumber === step
                              ? "bg-green-600 text-white border-2 border-green-600"
                              : stepNumber < step
                              ? "bg-green-500 text-white border-2 border-green-500"
                              : "bg-white text-gray-700 border-2 border-gray-300"
                          }`}
                        >
                          {stepNumber}
                        </div>
                        <span className="text-xs mt-1 text-gray-500">
                          {stepNumber === 1 && "Contact"}
                          {stepNumber === 2 && "Agency"}
                          {stepNumber === 3 && "Location"}
                          {stepNumber === 4 && "Profile"}
                          {stepNumber === 5 && "Account"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Rest of the form remains the same as previous implementation */}
            <div className="mt-8 space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="example@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Agency/Organization name
                      </label>
                      <input
                        id="agencyName"
                        name="agencyName"
                        type="text"
                        value={formData.agencyName}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.agencyName
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.agencyName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.agencyName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="licenseNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        License Number{" "}
                        <span className="text-gray-500">*optional</span>
                      </label>
                      <input
                        id="licenseNumber"
                        name="licenseNumber"
                        type="text"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Lagos"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Ikeja"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Add Profile Picture
                    </h3>
                    <p className="text-sm text-gray-500">Build your profile</p>
                  </div>
                  <div
                    className={`mt-4 flex justify-center px-6 pt-5 pb-6 border-2 ${
                      errors.profilePicture
                        ? "border-red-500"
                        : "border-gray-300"
                    } border-dashed rounded-md`}
                  >
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="profilePicture"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Choose File</span>
                          <input
                            id="profilePicture"
                            name="profilePicture"
                            type="file"
                            onChange={handleFileChange}
                            className="sr-only"
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  {formData.profilePicture && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected file: {formData.profilePicture.name}
                    </p>
                  )}
                  {errors.profilePicture && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.profilePicture}
                    </p>
                  )}
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      User Name
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${
                        errors.username ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.username}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="acceptTerms"
                        className="font-medium text-gray-700"
                      >
                        Accept Terms
                      </label>
                      <a
                        href="#"
                        className="ml-1 text-blue-600 hover:text-blue-500"
                      >
                        Read Terms and conditions
                      </a>
                      {errors.acceptTerms && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.acceptTerms}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-1/3 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className={`${
                    step > 1 ? "w-2/3 ml-4" : "w-full"
                  } flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {step === 5 ? "Create Account" : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
