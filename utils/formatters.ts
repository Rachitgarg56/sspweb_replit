
// Helper function to convert Firebase timestamp to Date
export const convertToDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    return new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  };
  
  export const formatDate = (timestampOrString?: { seconds: number; nanoseconds: number } | string): string => {
    let date: Date | undefined;
  
    if (typeof timestampOrString === "string") {
      date = new Date(timestampOrString); // Convert string to Date
    } else if (timestampOrString?.seconds) {
      date = new Date(timestampOrString.seconds * 1000); // Convert Firestore Timestamp
    }
  
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "Invalid Date"; // Fallback text
    }
  
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  
  
  
  export const formatTime = (timestamp: { seconds: number; nanoseconds: number } | undefined): string => {
    // Convert Firebase timestamp to Date object
    const date = timestamp ? convertToDate(timestamp) : undefined;
  
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'Invalid Time'; // Or any fallback text you prefer
    }
  
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata', // Ensure time zone is IST
    };
  
    return new Intl.DateTimeFormat('en-IN', options).format(date);
  };
  