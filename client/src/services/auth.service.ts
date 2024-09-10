import baseUrl from "@/api";
// GET
export const getAllUser = async () => {
  try {
    const response = await baseUrl.get("users");
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const getAccAdmin = async()=>{
  try {
    const response = await baseUrl.get("accountAdmin");
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
}

export const getAllCourses = async () => {
  try {
    const response = await baseUrl.get("courses");
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const getAllExamSubjects = async () => {
  try {
    const response = await baseUrl.get("examSubjects");
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const getAllExams = async () => {
  try {
    const response = await baseUrl.get("exam");
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const getAllQuestion = async () => {
  try {
    const response = await baseUrl.get("questions");
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const getAllUserAnswer = async () => {
  try {
    const response = await baseUrl.get("userAnswers");
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

// ADD

export const addUser = async (user: any) => {
  try {
    const response = await baseUrl.post("users", user);
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const addCourse = async (courses: any) => {
  try {
    const response = await baseUrl.post("courses", courses);
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const addExamSubject = async (examSubjects: any) => {
  try {
    const response = await baseUrl.post("examSubjects", examSubjects);
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const addExam = async (exam: any) => {
  try {
    const response = await baseUrl.post("exam", exam);
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const addQuestion = async (questions: any) => {
  try {
    const response = await baseUrl.post("questions", questions);
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

export const addUserAnswer = async (userAnswers: any) => {
  try {
    const response = await baseUrl.post("userAnswers", userAnswers);
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};

// Update
export const updateStatusUser = async (acc: any) => {
  try {
    const response = await baseUrl.patch(`users/${acc.id}`, acc);
    return response;
  } catch (error) {
    console.log(error);
    
  }
};

export const updateCourses = async (course: any) => {
  try {
    const response = await baseUrl.patch(`courses/${course.id}`, course);
    return response;
  } catch (error: any) {
   console.log(error);
   
  }
};

export const updateAccount = async (user: any) => {
  try {
    const response = await baseUrl.patch(`users/${user.id}`, user);
    return response;
  } catch (error: any) {
    console.error(error);
  }
};


export const updateExamSubject = async (course: any) => {
  try {
    const response = await baseUrl.patch(`examSubjects/${course.id}`, course);
    return response;
  } catch (error: any) {
   console.log(error);
   
  }
};

export const updateExam = async (course: any) => {
  try {
    const response = await baseUrl.patch(`exam/${course.id}`, course);
    return response;
  } catch (error: any) {
   console.log(error);
   
  }
};

export const updateQuestions = async (course: any) => {
  try {
    const response = await baseUrl.patch(`questions/${course.id}`, course);
    return response;
  } catch (error: any) {
   console.log(error);
   
  }
};


// Delete
export const deleteCourses = async (id: any) => {
  try {
    const response = await baseUrl.delete(`courses/${id}`);
    return response;
  } catch (error: any) {
    throw new Error(`Error deleting category: ${error.message}`);
  }
};

export const deleteExamSubjects = async (id: any) => {
  try {
    const response = await baseUrl.delete(`examSubjects/${id}`);
    return response;
  } catch (error: any) {
    throw new Error(`Error deleting category: ${error.message}`);
  }
};

export const deleteExams = async (id: any) => {
  try {
    const response = await baseUrl.delete(`exam/${id}`);
    return response;
  } catch (error: any) {
    throw new Error(`Error deleting category: ${error.message}`);
  }
};

export const deleteQuestions = async (id: any) => {
  try {
    const response = await baseUrl.delete(`questions/${id}`);
    return response;
  } catch (error: any) {
    throw new Error(`Error deleting category: ${error.message}`);
  }
};
