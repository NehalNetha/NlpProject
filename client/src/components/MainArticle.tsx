import React from 'react'
import Navbar from './Navbar'
import Link from 'next/link'


function MainArticle() {
   
  return (
    <div className='w-full bg-gradient-to-r from-white to-[#c2e4fc] gap-11 pb-8'>
        <Navbar />
        <div className='flex flex-col justify-center items-center mt-[1.9rem]'>
            <div className='flex flex-col gap-2 items-center'>
                <p className='text-[2.3rem] md:text-[3.3rem] font-medium'>Analyse your medical reports </p>
                <p className='text-gray-500 font-normal text-[1.3rem] w-[65%] text-center'>Get insights from your medical reports, understand them, and get to know what to do next</p>
            </div>

            <div  className='flex flex-row gap-4 mt-8'>
                <Link href="/chat" className='px-4 py-[6px] text-[15px] bg-[#001F3F] text-white rounded-md'>
                    Get Started
                </Link>
                <button className='px-4 py-[6px] text-[15px] font-medium bg-white text-black rounded-md'>
                    Check Use Cases
                </button>
            </div>
        </div>

        <div className=' flex justify-center items-center '>
            <div className="relative w-[50%] mt-5  h-96">
            <div className="absolute top-4 right-4 w-2/3 h-48 bg-white rounded-lg shadow-md p-4 z-20 overflow-auto">
                <div className="text-sm font-semibold text-gray-600 mb-2">Report Analysis</div>
                <div className="text-sm text-gray-500">
                <p className="mb-2">Based on the medical reports, the patient's results are generally within normal ranges:</p>
                <ul className="list-disc pl-5 mb-2">
                    <li>Blood cell counts are within normal limits, indicating good overall health.</li>
                    <li>Cholesterol levels are favorable, with LDL at the optimal level and HDL at a good level.</li>
                </ul>
                <p className="mb-2">Recommendations:</p>
                <ul className="list-disc pl-5">
                    <li>Maintain current lifestyle and dietary habits.</li>
                    <li>Continue regular check-ups to monitor health status.</li>
                </ul>
                </div>
            </div>
            <div className="absolute bottom-4 left-4 w-3/4 h-72 bg-white rounded-lg shadow-md p-4 z-10 overflow-auto">
                <div className="text-sm font-semibold text-gray-600 mb-2">Medical Reports</div>
                <div className="text-sm text-gray-500">
                <p className="mb-2"><strong>Patient:</strong> John Doe</p>
                <p className="mb-2"><strong>Date:</strong> 2024-10-04</p>
                <p className="mb-2"><strong>Blood Test Results:</strong></p>
                <ul className="list-disc pl-5 mb-2">
                    <li>Hemoglobin: 14.2 g/dL (Normal range: 13.5-17.5 g/dL)</li>
                    <li>White Blood Cell Count: 7,500/μL (Normal range: 4,500-11,000/μL)</li>
                    <li>Platelet Count: 250,000/μL (Normal range: 150,000-450,000/μL)</li>
                </ul>
                <p className="mb-2"><strong>Cholesterol Panel:</strong></p>
                <ul className="list-disc pl-5 mb-2">
                    <li>Total Cholesterol: 180 mg/dL (Desirable: &lt;200 mg/dL)</li>
                    <li>LDL Cholesterol: 100 mg/dL (Optimal: &lt;100 mg/dL)</li>
                    <li>HDL Cholesterol: 50 mg/dL (Good: &gt;40 mg/dL for men, &gt;50 mg/dL for women)</li>
                </ul>
                </div>
            </div>
            </div>
        </div>

    </div>
  )
}

export default MainArticle