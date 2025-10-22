import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { PROFESSION_DATA } from "../shared/professionData";


interface ApplicationFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  submitButtonText?: string;
  onCancel?: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  availability: string;
  yearsExperience: string;
}

const ApplicationFormComponent: React.FC<ApplicationFormProps> = ({ onSubmit, isLoading, submitButtonText = "Submit", onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    availability: "",
    yearsExperience: "",
  });
  const [selectedProfession, setSelectedProfession] = useState<string>("");
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [hasMobileExperience, setHasMobileExperience] = useState<boolean>(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null);

  const handleProfessionChange = (value: string) => {
    setSelectedProfession(value);
    setSelectedSpecializations([]); // Reset specializations when profession changes
    setSelectedEquipment([]); // Reset equipment when profession changes
  };

  const handleSpecializationChange = (spec: string) => {
    setSelectedSpecializations(prev =>
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
  };

  const handleEquipmentChange = (eq: string) => {
    setSelectedEquipment(prev =>
      prev.includes(eq) ? prev.filter(e => e !== eq) : [...prev, eq]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !selectedProfession) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (selectedSpecializations.length === 0) {
      toast.error("Please select at least one specialization.");
      return;
    }

    if (selectedEquipment.length === 0) {
      toast.error("Please select at least one equipment item");
      return;
    }

    const cvUrl = cvFile ? `uploads/cv/${cvFile.name}` : undefined;
    const insuranceUrl = insuranceFile ? `uploads/insurance/${insuranceFile.name}` : undefined;

    onSubmit({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      profession: selectedProfession,
      yearsExperience: parseInt(formData.yearsExperience) || 0,
      specializations: JSON.stringify(selectedSpecializations),
      equipment: JSON.stringify(selectedEquipment),
      hasMobileExperience,
      availability: formData.availability,
      cvUrl,
      insuranceUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-blue-600">👤</span> Personal Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+44 7911 123456"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="yearsExperience">Years of Experience</Label>
            <Input
              id="yearsExperience"
              type="number"
              placeholder="5"
              value={formData.yearsExperience}
              onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Professional Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-green-600">💼</span> Professional Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="profession">Profession *</Label>
            <Select value={selectedProfession} onValueChange={handleProfessionChange} required>
              <SelectTrigger id="profession">
                <SelectValue placeholder="Select your profession" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PROFESSION_DATA).map(prof => (
                  <SelectItem key={prof.name} value={prof.name}>
                    {prof.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedProfession && ( 
            <div>
              <Label>Specializations *</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {PROFESSION_DATA[selectedProfession]?.specializations.map(spec => (
                  <div key={spec} className="flex items-center space-x-2">
                    <Checkbox
                      id={spec}
                      checked={selectedSpecializations.includes(spec)}
                      onCheckedChange={() => handleSpecializationChange(spec)}
                    />
                    <Label htmlFor={spec}>{spec}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Equipment and Experience */}
      {selectedProfession && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-orange-600">🛠️</span> Equipment & Experience
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Equipment *</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {PROFESSION_DATA[selectedProfession]?.equipment.map(eq => (
                  <div key={eq} className="flex items-center space-x-2">
                    <Checkbox
                      id={eq}
                      checked={selectedEquipment.includes(eq)}
                      onCheckedChange={() => handleEquipmentChange(eq)}
                    />
                    <Label htmlFor={eq}>{eq}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-auto">
              <Checkbox
                id="mobileExperience"
                checked={hasMobileExperience}
                onCheckedChange={(checked) => setHasMobileExperience(!!checked)}
              />
              <Label htmlFor="mobileExperience">Has mobile experience (can travel to clients)</Label>
            </div>
          </div>
        </div>
      )}

      {/* Availability */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-purple-600">🗓️</span> Availability
        </h3>
        <Textarea
          id="availability"
          placeholder="e.g., Weekdays 9am-5pm, flexible on weekends"
          value={formData.availability}
          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
          rows={4}
        />
      </div>

      {/* Document Uploads */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-red-600">📄</span> Document Uploads
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cvUpload">Upload CV</Label>
            <Input
              id="cvUpload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCvFile(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div>
            <Label htmlFor="insuranceUpload">Upload Insurance Certificate</Label>
            <Input
              id="insuranceUpload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setInsuranceFile(e.target.files ? e.target.files[0] : null)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Submitting..." : submitButtonText}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default ApplicationFormComponent;

