import { useMutation } from '@tanstack/react-query';
import { UserSignUp } from '../models/user.model';
import firebaseService from '../services/firebase.service';
import { useAuthContext } from './useAuthContext';

export function useAuth() {
  const { userData } = useAuthContext();
  //   const queryClient = useQueryClient();
  // const signUpUser = (userData: UserSignUp) => {
  //     firebaseService.createUser(userData.email, userData.password);
  // }

  const signUpUser = useMutation({
    mutationFn: (userData: UserSignUp) =>
      firebaseService.createUser(userData.email, userData.password),
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { signUpUser: signUpUser.mutate };
}
