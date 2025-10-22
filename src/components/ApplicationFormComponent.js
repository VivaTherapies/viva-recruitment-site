import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { PROFESSION_DATA } from "../shared/professionData";
const ApplicationFormComponent = ({ onSubmit, isLoading, submitButtonText = "Submit", onCancel }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        availability: "",
        yearsExperience: "",
    });
    const [selectedProfession, setSelectedProfession] = useState("");
    const [selectedSpecializations, setSelectedSpecializations] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState([]);
    const [hasMobileExperience, setHasMobileExperience] = useState(false);
    const [cvFile, setCvFile] = useState(null);
    const [insuranceFile, setInsuranceFile] = useState(null);
    const handleProfessionChange = (value) => {
        setSelectedProfession(value);
        setSelectedSpecializations([]); // Reset specializations when profession changes
        setSelectedEquipment([]); // Reset equipment when profession changes
    };
    const handleSpecializationChange = (spec) => {
        setSelectedSpecializations(prev => prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]);
    };
    const handleEquipmentChange = (eq) => {
        setSelectedEquipment(prev => prev.includes(eq) ? prev.filter(e => e !== eq) : [...prev, eq]);
    };
    const handleSubmit = (e) => {
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
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [_jsx("span", { className: "text-blue-600", children: "\uD83D\uDC64" }), " Personal Information"] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "fullName", children: "Full Name *" }), _jsx(Input, { id: "fullName", placeholder: "John Doe", value: formData.fullName, onChange: (e) => setFormData({ ...formData, fullName: e.target.value }), required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "email", children: "Email Address *" }), _jsx(Input, { id: "email", type: "email", placeholder: "john.doe@example.com", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "phone", children: "Phone Number" }), _jsx(Input, { id: "phone", type: "tel", placeholder: "+44 7911 123456", value: formData.phone, onChange: (e) => setFormData({ ...formData, phone: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "yearsExperience", children: "Years of Experience" }), _jsx(Input, { id: "yearsExperience", type: "number", placeholder: "5", value: formData.yearsExperience, onChange: (e) => setFormData({ ...formData, yearsExperience: e.target.value }) })] })] })] }), _jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [_jsx("span", { className: "text-green-600", children: "\uD83D\uDCBC" }), " Professional Details"] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "profession", children: "Profession *" }), _jsxs(Select, { value: selectedProfession, onValueChange: handleProfessionChange, required: true, children: [_jsx(SelectTrigger, { id: "profession", children: _jsx(SelectValue, { placeholder: "Select your profession" }) }), _jsx(SelectContent, { children: Object.values(PROFESSION_DATA).map(prof => (_jsx(SelectItem, { value: prof.name, children: prof.name }, prof.name))) })] })] }), selectedProfession && (_jsxs("div", { children: [_jsx(Label, { children: "Specializations *" }), _jsx("div", { className: "grid grid-cols-2 gap-2 mt-2", children: PROFESSION_DATA[selectedProfession]?.specializations.map(spec => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: spec, checked: selectedSpecializations.includes(spec), onCheckedChange: () => handleSpecializationChange(spec) }), _jsx(Label, { htmlFor: spec, children: spec })] }, spec))) })] }))] })] }), selectedProfession && (_jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [_jsx("span", { className: "text-orange-600", children: "\uD83D\uDEE0\uFE0F" }), " Equipment & Experience"] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { children: "Equipment *" }), _jsx("div", { className: "grid grid-cols-2 gap-2 mt-2", children: PROFESSION_DATA[selectedProfession]?.equipment.map(eq => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: eq, checked: selectedEquipment.includes(eq), onCheckedChange: () => handleEquipmentChange(eq) }), _jsx(Label, { htmlFor: eq, children: eq })] }, eq))) })] }), _jsxs("div", { className: "flex items-center space-x-2 mt-auto", children: [_jsx(Checkbox, { id: "mobileExperience", checked: hasMobileExperience, onCheckedChange: (checked) => setHasMobileExperience(!!checked) }), _jsx(Label, { htmlFor: "mobileExperience", children: "Has mobile experience (can travel to clients)" })] })] })] })), _jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [_jsx("span", { className: "text-purple-600", children: "\uD83D\uDDD3\uFE0F" }), " Availability"] }), _jsx(Textarea, { id: "availability", placeholder: "e.g., Weekdays 9am-5pm, flexible on weekends", value: formData.availability, onChange: (e) => setFormData({ ...formData, availability: e.target.value }), rows: 4 })] }), _jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [_jsx("span", { className: "text-red-600", children: "\uD83D\uDCC4" }), " Document Uploads"] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "cvUpload", children: "Upload CV" }), _jsx(Input, { id: "cvUpload", type: "file", accept: ".pdf,.doc,.docx", onChange: (e) => setCvFile(e.target.files ? e.target.files[0] : null) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "insuranceUpload", children: "Upload Insurance Certificate" }), _jsx(Input, { id: "insuranceUpload", type: "file", accept: ".pdf,.jpg,.jpeg,.png", onChange: (e) => setInsuranceFile(e.target.files ? e.target.files[0] : null) })] })] })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Button, { type: "submit", className: "flex-1", disabled: isLoading, children: isLoading ? "Submitting..." : submitButtonText }), onCancel && (_jsx(Button, { type: "button", variant: "outline", onClick: onCancel, children: "Cancel" }))] })] }));
};
export default ApplicationFormComponent;
