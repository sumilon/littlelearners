// Clock Time Module Data
// Teaching time concepts for kids

export const timeBasics = [
  { hour: 1, minute: 0, display: '1:00', text: 'One o\'clock', emoji: '🕐' },
  { hour: 2, minute: 0, display: '2:00', text: 'Two o\'clock', emoji: '🕑' },
  { hour: 3, minute: 0, display: '3:00', text: 'Three o\'clock', emoji: '🕒' },
  { hour: 4, minute: 0, display: '4:00', text: 'Four o\'clock', emoji: '🕓' },
  { hour: 5, minute: 0, display: '5:00', text: 'Five o\'clock', emoji: '🕔' },
  { hour: 6, minute: 0, display: '6:00', text: 'Six o\'clock', emoji: '🕕' },
  { hour: 7, minute: 0, display: '7:00', text: 'Seven o\'clock', emoji: '🕖' },
  { hour: 8, minute: 0, display: '8:00', text: 'Eight o\'clock', emoji: '🕗' },
  { hour: 9, minute: 0, display: '9:00', text: 'Nine o\'clock', emoji: '🕘' },
  { hour: 10, minute: 0, display: '10:00', text: 'Ten o\'clock', emoji: '🕙' },
  { hour: 11, minute: 0, display: '11:00', text: 'Eleven o\'clock', emoji: '🕚' },
  { hour: 12, minute: 0, display: '12:00', text: 'Twelve o\'clock', emoji: '🕛' }
];

export const timeWithMinutes = [
  { hour: 1, minute: 30, display: '1:30', text: 'One thirty', emoji: '🕜' },
  { hour: 2, minute: 30, display: '2:30', text: 'Two thirty', emoji: '🕝' },
  { hour: 3, minute: 30, display: '3:30', text: 'Three thirty', emoji: '🕞' },
  { hour: 4, minute: 15, display: '4:15', text: 'Four fifteen', emoji: '🕟' },
  { hour: 5, minute: 45, display: '5:45', text: 'Five forty-five', emoji: '🕠' },
  { hour: 6, minute: 30, display: '6:30', text: 'Six thirty', emoji: '🕡' },
  { hour: 7, minute: 15, display: '7:15', text: 'Seven fifteen', emoji: '🕢' },
  { hour: 8, minute: 45, display: '8:45', text: 'Eight forty-five', emoji: '🕣' },
  { hour: 9, minute: 30, display: '9:30', text: 'Nine thirty', emoji: '🕤' },
  { hour: 10, minute: 15, display: '10:15', text: 'Ten fifteen', emoji: '🕥' },
  { hour: 11, minute: 45, display: '11:45', text: 'Eleven forty-five', emoji: '🕦' },
  { hour: 12, minute: 30, display: '12:30', text: 'Twelve thirty', emoji: '🕧' }
];

export const dailyActivities = [
  { time: '7:00', activity: 'Wake up', emoji: '⏰', description: 'Time to start the day!' },
  { time: '8:00', activity: 'Breakfast', emoji: '🍳', description: 'Eat a healthy breakfast' },
  { time: '9:00', activity: 'School starts', emoji: '🏫', description: 'Time for learning' },
  { time: '12:00', activity: 'Lunch time', emoji: '🍱', description: 'Enjoy your lunch' },
  { time: '3:00', activity: 'School ends', emoji: '🎒', description: 'Time to go home' },
  { time: '4:00', activity: 'Play time', emoji: '⚽', description: 'Have fun playing' },
  { time: '6:00', activity: 'Dinner time', emoji: '🍽️', description: 'Family dinner' },
  { time: '8:00', activity: 'Bedtime story', emoji: '📖', description: 'Story time!' },
  { time: '9:00', activity: 'Sleep time', emoji: '😴', description: 'Good night!' }
];

export const timeQuizQuestions = [
  { question: 'What time is it?', hour: 3, minute: 0, options: ['3:00', '6:00', '9:00'], answer: '3:00', difficulty: 'easy' },
  { question: 'What time is it?', hour: 6, minute: 0, options: ['3:00', '6:00', '12:00'], answer: '6:00', difficulty: 'easy' },
  { question: 'What time is it?', hour: 9, minute: 0, options: ['9:00', '3:00', '12:00'], answer: '9:00', difficulty: 'easy' },
  { question: 'What time is it?', hour: 12, minute: 0, options: ['12:00', '6:00', '3:00'], answer: '12:00', difficulty: 'easy' },
  { question: 'What time is it?', hour: 4, minute: 30, options: ['4:30', '8:30', '6:30'], answer: '4:30', difficulty: 'medium' },
  { question: 'What time is it?', hour: 7, minute: 15, options: ['7:15', '7:45', '7:30'], answer: '7:15', difficulty: 'medium' },
  { question: 'What time is it?', hour: 10, minute: 45, options: ['10:15', '10:30', '10:45'], answer: '10:45', difficulty: 'medium' },
  { question: 'What time is it?', hour: 2, minute: 20, options: ['2:20', '2:40', '4:20'], answer: '2:20', difficulty: 'hard' },
  { question: 'What time is it?', hour: 5, minute: 55, options: ['5:55', '11:25', '5:11'], answer: '5:55', difficulty: 'hard' },
  { question: 'What time is it?', hour: 8, minute: 10, options: ['8:10', '2:40', '8:02'], answer: '8:10', difficulty: 'hard' }
];

// Helper function to get clock hand positions
export const getClockHandPositions = (hour, minute) => {
  const hourAngle = ((hour % 12) + minute / 60) * 30; // 30 degrees per hour
  const minuteAngle = minute * 6; // 6 degrees per minute
  return { hourAngle, minuteAngle };
};

export default {
  timeBasics,
  timeWithMinutes,
  dailyActivities,
  timeQuizQuestions,
  getClockHandPositions
};
