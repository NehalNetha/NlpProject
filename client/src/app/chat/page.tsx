"use client"
import MarkdownRenderer from '@/components/MarkdownRenderer';
import RightSidebar from '@/components/RightSidebar';
import SidebarComp from '@/components/SidebarComp';
import { ArrowUpCircle, ClipboardPlus, File, Image, Loader, Paperclip, Pill, Pin, Plus, Sidebar, Sparkle, Stethoscope, Trash } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import ChatInterface from './(components)/ChatInterface';
import SymptomsCheckbox from '@/components/SymptomsCheckbox';
import { Card } from '@/components/ui/card';


interface SidebarProps {
    toggleSidebar: () => void;
}

interface ImageResponse {
    imageName: string;
    extractedText: string;
    summary: string;
}

interface PdfResponse {
    message: string, 
    summary: string,
    pdfName: string,
    pdfUrl: string
}

interface Message {
    type: 'question' | 'response' | 'file';
    content: string;
    timestamp?: number;
    filename?: string;
    fileUrl?: string;
}

function page() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)
    const [imageResponse, setImageResponse] = useState<ImageResponse | null>();
    const [pdfResponse, setPdfResponse] = useState<PdfResponse | null>(null);
    const [llmQuestion, setLlmQuestion] = useState<string | null>(null);
    const [llmResponse, setLlmResponse] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const [symptomsCheckBox, setSymptomsExceptBox] = useState(false)
    const [symptomsForCheckboxArray, setSymptomsForCheckboxArray] = useState<string[] | null>(null)


    const [symptomSummary, setsymptomSummary] = useState<string | null>(null)

    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load existing session and messages on mount
    useEffect(() => {
        const savedSessionId = localStorage.getItem('sessionId');
        if (savedSessionId) {
            setSessionId(savedSessionId);
            fetchChatHistory(savedSessionId);
        }
    }, []);

    // Fetch chat history for a session
    const fetchChatHistory = async (sid: string) => {
        try {
            const response = await fetch(`http://localhost:8080/chat-history/${sid}`, {
                credentials: "include"
            }
            );
            if (response.ok) {
                const history = await response.json();
                const formattedMessages = history.messages.map((msg: any) => {
                    // Check if the message content is a JSON string containing file info
                    try {
                        const parsedContent = JSON.parse(msg.content);
                        if (parsedContent.type === 'file') {
                            return {
                                type: 'file',
                                content: '',
                                timestamp: msg.timestamp,
                                filename: parsedContent.filename,
                                fileUrl: parsedContent.fileUrl
                            };
                        }
                    } catch (e) {
                        // Not a JSON string, treat as regular message
                    }
                    
                    return {
                        type: msg.role === 'user' ? 'question' : 'response',
                        content: msg.content,
                        timestamp: msg.timestamp
                    };
                });
                setMessages(formattedMessages);
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };


    const CreateNewSession = async () => {
        try {
          const response = await fetch('http://localhost:8080/create-session', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }

          });
          
          if (response.ok) {
            const { sessionId } = await response.json();
            localStorage.setItem('sessionId', sessionId);
            setSessionId(sessionId);
            window.location.reload(); // Refresh the page
          }
        } catch (error) {
          console.error('Error creating new session:', error);
        }
    }
    

    const togglesymptomsCheckBox = () => {
        setSymptomsExceptBox(!symptomsCheckBox)
        // Reset symptom summary when closing
        if (symptomsCheckBox) {
            setsymptomSummary(null)
        }
    }



    const a: ImageResponse = {
        imageName: 'image.jpg',
        extractedText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        summary: 'This is a long random summary for test purposes. The image appears to depict a scenic landscape with rolling hills and a vibrant sunset. In the foreground, there\'s a rustic wooden fence bordering a field of wildflowers. A winding dirt road can be seen leading off into the distance, disappearing over the horizon. The sky is painted with hues of orange, pink, and purple, creating a breathtaking backdrop for the scene. Several large oak trees dot the landscape, their silhouettes stark against the colorful sky. In the far distance, one can make out the faint outline of mountains. This serene and picturesque scene evokes a sense of tranquility and natural beauty, capturing a moment of perfect harmony between land and sky. The composition and lighting suggest this image was taken during the golden hour, just before sunset, when the light is at its most magical and transformative.'
    }


    const fileInputRef = useRef<HTMLInputElement>(null);
    const documentInputRef = useRef<HTMLInputElement>(null);

    const handleFileInputClick = (type: any) => {
        if (type === 'image') {
          fileInputRef.current?.click();
        } else if (type === 'document') {
          documentInputRef.current?.click();
        }
        setIsModalOpen(false); // Close the modal
      };
    

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const toggleRightSidebar = () => {
        setIsRightSidebarOpen(!isRightSidebarOpen)
    }


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsLoading(true);
            setError(null);
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch('http://localhost:8080/upload-image', {
                    method: 'POST',
                    credentials: 'include',

                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    setImageResponse(result);
                } else {
                    setError('Failed to upload image. Please try again.');
                }
            } catch (error) {
                setError('Error uploading image. Please check your connection.');
            } finally {
                setIsLoading(false);
            }
        }
    }


    const handleFileChangePdf = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsLoading(true);
            setError(null);
            const formData = new FormData();
            formData.append('pdf', file);

            try {
                const response = await fetch('http://localhost:8080/upload-pdf', {
                    method: 'POST',
                    credentials: 'include',

                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    setPdfResponse(result);
                    setSymptomsForCheckboxArray(result.symptoms.symptoms);
                    setSessionId(result.sessionId);
                    localStorage.setItem('sessionId', result.sessionId);
                } else {
                    setError('Failed to upload PDF. Please try again.');
                }
            } catch (error) {
                setError('Error uploading PDF. Please check your connection.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    
    


    const handleAskLLm = async () => {
        setLlmQuestion("")
        if (!llmQuestion || !sessionId) return;

        const newQuestion: Message = {
            type: 'question',
            content: llmQuestion,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, newQuestion]);

        try {
            const response = await fetch('http://localhost:8080/ask-llm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',

                body: JSON.stringify({ 
                    question: llmQuestion,
                    sessionId: sessionId
                }),
            });

            if (response.ok) {
                const result = await response.json();
                const newResponse: Message = {
                    type: 'response',
                    content: result.content,
                    timestamp: Date.now()
                };
                setMessages(prev => [...prev, newResponse]);
                setLlmQuestion('');
            }
        } catch (error) {
            console.error('Error asking LLM:', error);
        }
    };

    useEffect(() => {
        console.log(messages)
    }, [messages])

    const toggleModal : any = () => setIsModalOpen(!isModalOpen);


    const handleSymptomsChange = (selectedSymptoms: string[]) => {
    console.log('Selected symptoms:', selectedSymptoms);
    };

  return (
            <div className='flex flex-row h-screen'>
            {/* Left Sidebar */}
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-[16rem]' : 'w-[3rem] md:w-[4.5rem]'}`}>
                {isSidebarOpen ? (
                    <div className='bg-[#e8e9ef] bg-opacity-1 border border-gray-300 border-l-[1.4px] h-full pt-9 px-6 shadow-md'>
                        <SidebarComp toggleSidebar={toggleSidebar} CreateNewSession={CreateNewSession}/>
                    </div>
                ) : (
                    <button onClick={toggleSidebar} className='bg-gray-100 w-full h-full border border-gray-300 border-l-[1.4px] flex items-start justify-start pt-9'>
                        <Sidebar className='w-6 h-6 pl-[8px] md:w-9 md:h-9 md:pl-[14px]' />
                    </button>
                )}
            </div>

            {/* Main Content */}
            <div className='flex-1 bg-gradient-to-br from-white to-[#c2e4fc] flex flex-col pb-3'>
                {/* Scrollable Content Area */}
                <div className='flex-1 overflow-y-auto'>
                    {!imageResponse && !pdfResponse && messages.length == 0 ? (
                        <div className='flex items-center justify-center h-full'>
                            {isLoading ? (
                                <div className='flex flex-col items-center gap-4'>
                                    <Loader className='w-8 h-8 animate-spin text-blue-500' />
                                    <p className='text-gray-600'>Processing your file...</p>
                                </div>
                            ) : error ? (
                                <div className='flex flex-col items-center gap-4 text-red-500 p-4'>
                                    <p>{error}</p>
                                    <button 
                                        onClick={() => setError(null)}
                                        className='text-sm text-blue-500 hover:underline'
                                    >
                                        Try again
                                    </button>
                                </div>
                            ) : (
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 w-full max-w-4xl'>
                                    <div className='bg-white p-4 rounded-lg shadow-md flex flex-col items-start gap-3 cursor-pointer hover:bg-blue-100 transition-all duration-300'>
                                    <ClipboardPlus className='text-red-400' />
                                    <h1 className='text-[14px] text-gray-700'>Upload a Medical Report</h1>
                                </div>
                                <div className='bg-white p-4 rounded-lg shadow-md flex flex-col items-start gap-3 cursor-pointer hover:bg-blue-100 transition-all duration-300'>  
                                    <Stethoscope className='text-yellow-500' />
                                    <h1 className='text-[14px] text-gray-700'>Understand what's happening</h1>
                                </div>
                                <div className='bg-white p-4 rounded-lg shadow-md flex flex-col items-start gap-3 cursor-pointer hover:bg-blue-100 transition-all duration-300'>
                                    <Pill className='text-green-500' />
                                    <h1 className='text-[14px] text-gray-700 pt-3'>Get a recovery plan</h1>
                                </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='min-h-0'>
                            {/* Image Response Section */}
                            {imageResponse && imageResponse.summary && (
                                <div className='w-full max-w-[90%] mx-auto flex flex-col justify-start items-start px-4 sm:px-8 lg:px-[2rem] mt-9 gap-3'>
                                    <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0'>
                                    <p className='text-[1.5rem] sm:text-[1.8rem] text-medium'>Some random ass title that is something</p>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <button className='flex flex-row gap-2 items-center bg-blue-500 text-white py-[6px] px-2 rounded-md'>
                                            <Plus className='w-4 h-4' />
                                            <p className='text-[13px]'>New Chat</p>
                                        </button>
                                        <div className="w-px h-6 bg-gray-300 mx-2"></div>
                                        <button>
                                            <Trash className='w-5 h-5 text-gray-500 hover:text-red-500' />
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-gray-300"></div>
                                <div className='flex flex-row items-start gap-2 mt-9'>
                                    <Sparkle className='w-6 h-6  text-yellow-500 flex-shrink-0' />
                                    <div className='text-left flex-grow transition-all duration-300'>
                                        <MarkdownRenderer markdown={imageResponse.summary} />
                                    </div>
                                </div>
                                </div>
                            )}
                            
                            {/* PDF Response Section */}
                            {pdfResponse && pdfResponse.summary && (
                                <div className='w-full max-w-[90%] mx-auto flex flex-col justify-start items-start px-4 sm:px-8 lg:px-[2rem] mt-9 gap-3'>
                                        <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0'>
                                    <p className='text-[1.5rem] sm:text-[1.8rem] text-medium'>PDF Response</p>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <button className='flex flex-row gap-2 items-center bg-blue-500 text-white py-[6px] px-2 rounded-md'>
                                            <Plus className='w-4 h-4' />
                                            <p className='text-[13px]'>New Chat</p>
                                        </button>
                                        <div className="w-px h-6 bg-gray-300 mx-2"></div>
                                        <button>
                                            <Trash className='w-5 h-5 text-gray-500 hover:text-red-500' />
                                        </button>
                                    </div>
                                </div>

                                

                                <div className="w-full h-px bg-gray-300"></div>
                                <div className='flex flex-row items-start gap-2 mt-9'>
                                    <Sparkle className='w-6 h-6  text-yellow-500 flex-shrink-0' />
                                    <div className='text-left flex-grow transition-all duration-300'>
                                        <Card>
                                            <div className='p-2'>
                                                <MarkdownRenderer markdown={pdfResponse.summary}  />
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                                </div>
                            )}
                            
                            {/* Chat Interface */}
                            <div className='min-h-0'>
                                {messages.map((message, index) => (
                                    <div key={index}>
                                        {message.type === 'file' && (
                                            <div className='w-full max-w-[90%] mx-auto flex flex-col justify-start items-start px-4 sm:px-8 lg:px-[2rem] mt-4 gap-2'>
                                                <div className='flex items-center gap-2'>
                                                    <File className='w-5 h-5 text-blue-500' />
                                                    <a 
                                                        href={message.fileUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className='text-blue-500 hover:underline'
                                                    >
                                                        {message.filename}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                        {/* Existing message rendering */}
                                        {message.type !== 'file' && message.type !== undefined && (
                                            <ChatInterface messages={[{
                                                type: message.type as 'question' | 'response',
                                                content: message.content,
                                                timestamp: message.timestamp
                                            }]} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Symptoms Checkbox Section */}
                    {!symptomsCheckBox && symptomsForCheckboxArray && (
                        <div className='relative md:pl-[6.8rem] pb-11 p-8'>
                            <button className='text-white text-medium bg-blue-500 px-4 py-3 rounded-md' onClick={togglesymptomsCheckBox}>
                                Check for more Symptoms
                            </button>
                        </div>
                    )}

                    
                    {symptomsCheckBox && (
                        <div className='md:ml-[4.8rem] md:mr-[4.8rem] p-8'>
                            <SymptomsCheckbox 
                                symptoms={symptomsForCheckboxArray ? symptomsForCheckboxArray : []} 
                                onSymptomsChange={handleSymptomsChange}
                                togglesymptomsCheckBox={togglesymptomsCheckBox}
                                setsymptomSummary={setsymptomSummary}
                                reportSummary={imageResponse?.summary || pdfResponse?.summary || ''}
                            />
                        </div>
                    )}
 
                </div>

                {/* Fixed Search Bar at Bottom */}
                <div className='flex-shrink-0 p-4 bg-gradient-to-br from-white to-[#c2e4fc] mt-5'>
                    <div className="relative w-full max-w-[90%] mx-auto">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full py-4 pl-10 pr-10 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 placeholder:text-sm placeholder:pl-3 placeholder:text-gray-400"
                            value={llmQuestion || ''}
                            onChange={(e) => setLlmQuestion(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleAskLLm();
                                }
                            }}
                        />
                        <div className="absolute inset-y-0 left-3 flex items-center pl-3">
                            <Paperclip 
                                className="w-4 h-4 text-gray-400 cursor-pointer" 
                                onClick={toggleModal}
                            />
                            {isModalOpen && (
                                <div className="absolute -top-16 left-0">
                                    <div className="bg-white py-4 px-4 flex flex-row gap-2 rounded-lg shadow-lg">
                                        <button onClick={() => handleFileInputClick('document')}>
                                            <File color="black" />
                                        </button>
                                        <button onClick={() => handleFileInputClick('image')}>
                                            <Image />
                                        </button>
                                    </div>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                            <input type="file" ref={documentInputRef} className="hidden" onChange={handleFileChangePdf} />
                        </div>
                        <button className="absolute inset-y-0 right-1 flex items-center pr-3" onClick={handleAskLLm}>
                            <ArrowUpCircle className="w-7 h-7 text-gray-300 hover:text-blue-700" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className={`transition-all duration-300 ${isRightSidebarOpen ? 'w-[17rem]' : 'md:w-[5rem] w-[3rem]'}`}>
                {isRightSidebarOpen ? (
                    <div className='border border-gray-300 border-l-[1.4px] bg-white shadow-md h-full pt-9 px-6'>
                        <RightSidebar toggleRightSidebar={toggleRightSidebar} imageName={imageResponse?.imageName || pdfResponse?.pdfName ||''} />
                    </div>
                ) : (
                    <button onClick={toggleRightSidebar} className='bg-gray-100 w-full h-full border border-gray-300 border-l-[1.4px] flex items-start justify-start pt-9'>
                        <Sidebar className='w-6 h-6 pl-[8px] md:pl-[14px] md:w-9 md:h-9'/>
                    </button>
                )}
            </div>
        </div>
  )
}

export default page