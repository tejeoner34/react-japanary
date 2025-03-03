import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UserSignUp } from '../models/user.model';
import firebaseService from '../services/firebase.service';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';
import { AuthServiceErrorModel } from '../models/errors.model';
import authServiceError from '../utils/errors';

export function useAuth() {
  const navigate = useNavigate();
  const { isUserLogged, userData } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState('');

  const signUpUser = useMutation({
    mutationFn: (userData: UserSignUp) =>
      firebaseService.createUser(userData.email, userData.password),
    onSuccess: () => {
      navigate('/decks');
    },
    onError: (error: AuthServiceErrorModel) => {
      setErrorMessage(authServiceError.getErrorMessage(error));
    },
  });

  const signInUser = useMutation({
    mutationFn: (userData: UserSignUp) => firebaseService.signIn(userData.email, userData.password),
    onSuccess: () => {
      navigate('/decks');
    },
    onError: (error: AuthServiceErrorModel) => {
      setErrorMessage(authServiceError.getErrorMessage(error));
    },
  });

  const signOutUser = useMutation({
    mutationFn: () => firebaseService.signOut(),
    onSuccess: () => {
      console.log('logged out');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const isError = signInUser.isError || signUpUser.isError || signOutUser.isError;
  return {
    isFetching: signInUser.isPending || signUpUser.isPending || signOutUser.isPending,
    isError,
    isUserLogged,
    userData,
    errorMessage: isError ? errorMessage : '',
    signUpUser: signUpUser.mutate,
    signInUser: signInUser.mutate,
    signOutUser: signOutUser.mutate,
  };
}
