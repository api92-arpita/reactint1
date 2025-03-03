import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

// Define Zod schema for validation
const employeeSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email format'),
  phoneNumber: z.string().optional().refine(
    value => value === undefined || /^\d{10,15}$/.test(value),
    { message: 'Phone number must be between 10 and 15 digits' }
  ),
  role: z.enum(['Developer', 'Designer', 'Manager'], { required_error: 'Role is required' }),
  joiningDate: z.string() // Accept string from the form input
    .refine(val => !isNaN(Date.parse(val)), { message: 'Invalid date format' }) // Validate it's a valid date string
    .transform(val => new Date(val)), // Transform to Date object
});

type EmployeeFormInputs = z.infer<typeof employeeSchema>;

// Initialize EmailJS
// Replace these with your actual EmailJS service credentials
const EMAIL_SERVICE_ID = 'service_5pn3lib';
const EMAIL_TEMPLATE_ID = 'template_72v2kej';
const EMAIL_PUBLIC_KEY = 'UEbf7gAmpVVwnzb3R';

const EmployeeForm: React.FC<{ onSubmit: (data: EmployeeFormInputs) => void }> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EmployeeFormInputs>({
    resolver: zodResolver(employeeSchema),
  });

  const handleFormSubmit = (data: EmployeeFormInputs) => {
    // Send the form data to the parent component
    onSubmit(data);
    
    // Prepare the email data
    const emailData = {
      to_email: 'arpita09gharai@gmail.com', // Replace with recipient email
      subject: `New Employee Registration: ${data.name}`,
      employee_name: data.name,
      employee_email: data.email,
      employee_phone: data.phoneNumber || 'Not provided',
      employee_role: data.role,
      joining_date: data.joiningDate.toLocaleDateString(),
    };
    
    // Send email using EmailJS
    emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      emailData,
      EMAIL_PUBLIC_KEY
    )
      .then((response) => {
        console.log('Email sent successfully:', response);
        toast.success('Employee added and notification email sent!');
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        toast.warning('Employee added but email notification failed to send.');
      });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 bg-gray-100 p-5 m-auto inline-block w-2xl border-r-8">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input 
          type="text" 
          {...register('name')} 
          className={`mt-1 block w-full border bg-gray-400 h-10 text-gray-950 p-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`} 
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input 
          type="email" 
          {...register('email')} 
          className={`mt-1 block w-full border bg-gray-400 h-10 text-gray-950 p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`} 
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input 
          type="tel" 
          {...register('phoneNumber')} 
          className={`mt-1 block w-full border bg-gray-400 h-10 text-gray-950 p-2 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`} 
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select 
          {...register('role')} 
          className={`mt-1 block w-full border bg-gray-400 h-10 text-gray-950 p-2 ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
        >
          <option value="">Select Role</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Joining Date</label>
        <input 
          type="date" 
          {...register('joiningDate')} 
          className={`mt-1 block w-full border bg-gray-400 h-10 text-gray-950 p-2 ${errors.joiningDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`} 
        />
        {errors.joiningDate && <p className="text-red-500 text-sm">{errors.joiningDate.message}</p>}
      </div>

      <button 
        type="submit" 
        className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;