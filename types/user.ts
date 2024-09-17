export default interface User {
  name: string;
  email: string;
  dob: string;
  created_at?: string;
  lessonsTaken?: { lessonId: string }[];
  totalScore?: number;
}
