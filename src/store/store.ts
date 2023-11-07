import create from 'zustand';

interface Participant {
    participants_id: number;
    participants_name: string;
    participants_surname: string;
    participants_middleName: string
    phone: number;
    coupon_number: string;
}

interface ParticipantState {
    participants: Participant[],
    setParticipants: (participants: Participant[]) => void;
}

  const useParticipantStore = create<ParticipantState>((set) => ({
    participants: [],
    setParticipants: (participants) => set({ participants }),
  }));
  
  export default useParticipantStore;