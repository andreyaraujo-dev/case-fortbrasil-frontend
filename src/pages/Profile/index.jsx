import React, { useState, useEffect, useContext } from 'react';

import {
  Container,
  Box,
  FormControl,
  Input,
  FormLabel,
  Button,
  Heading,
  Text,
  CircularProgress,
  useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import TopMenu from '../../components/TopMenu';
import Footer from '../../components/Footer';
import api from '../../services/api';
import { Context } from '../../Context/AuthContext';

const initialUserDataSate = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const initialPasswordState = {
  oldPassword: '',
  newPassword: '',
};

export default function Profile() {
  const toast = useToast();
  const { handleLogout } = useContext(Context);
  const [userData, setUserData] = useState(initialUserDataSate);
  const [passwordData, setPasswordData] = useState(initialPasswordState);
  const [isHiddenLoadingUpdateProfile, setIsHiddenLoadingUpdateProfile] = useState(true);
  const [isHiddenLoadingChangePassword, setIsHiddenLoadingChangePassword] = useState(true);
  const [isHiddenLoadingDeactivateAccount, setIsHiddenLoadingDeactivateAccount] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/users');
        setUserData(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  function onChangeInputs(e) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  function onChangeInputsPassword(e) {
    const { name, value } = e.target;
    setPasswordData({ ...userData, [name]: value });
  }

  async function handleUpdateProfile() {
    try {
      const { data } = await api.put('/users', {
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
      setIsHiddenLoadingUpdateProfile(false);
      setTimeout(() => {
        toast({
          status: 'success',
          duration: 5000,
          title: 'Atualziação feita',
          description: 'Perfil atualziado com sucesso',
          position: 'top',
        });
        setUserData(data);
      }, 2000);
      setTimeout(() => {
        setIsHiddenLoadingUpdateProfile(true);
      }, 3000);
    } catch (error) {
      setIsHiddenLoadingUpdateProfile(false);
      setTimeout(() => {
        toast({
          status: 'error',
          duration: 5000,
          title: 'Falha na atualização',
          description: `${error.message}`,
          position: 'top',
        });
      }, 2000);
      setTimeout(() => {
        setIsHiddenLoadingUpdateProfile(true);
      }, 3000);
    }
  }

  async function changePassword() {
    try {
      await api.put('/users/password', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      console.log(passwordData);
      setIsHiddenLoadingChangePassword(false);
      setTimeout(() => {
        toast({
          status: 'success',
          duration: 5000,
          title: 'Atualziação feita',
          description: 'Senha atualziada com sucesso',
          position: 'top',
        });
        setPasswordData(initialPasswordState);
      }, 2000);
      setTimeout(() => {
        setIsHiddenLoadingChangePassword(true);
      }, 3000);
    } catch (error) {
      setIsHiddenLoadingChangePassword(false);
      setTimeout(() => {
        toast({
          status: 'error',
          duration: 5000,
          title: 'Falha na atualização',
          description: `${error.message}`,
          position: 'top',
        });
      }, 2000);
      setTimeout(() => {
        setIsHiddenLoadingChangePassword(true);
      }, 3000);
    }
  }

  async function deactivateAccount() {
    try {
      await api.put('/users/deactivate');
      setIsHiddenLoadingDeactivateAccount(false);
      setTimeout(() => {
        toast({
          status: 'success',
          duration: 5000,
          title: 'Operação feita',
          description: 'Sua conta foi excluída',
          position: 'top',
        });
        setIsHiddenLoadingDeactivateAccount(true);
      }, 2000);
      setTimeout(() => {
        handleLogout();
      }, 4000);
    } catch (error) {
      setIsHiddenLoadingDeactivateAccount(false);
      setTimeout(() => {
        toast({
          status: 'error',
          duration: 5000,
          title: 'Falha na operação',
          description: `${error.message}`,
          position: 'top',
        });
      }, 2000);
      setTimeout(() => {
        setIsHiddenLoadingDeactivateAccount(true);
      }, 3000);
    }
  }

  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      maxWidth="100vw"
      height="100%"
      margin="0"
      padding="0"
      backgroundColor="whiteAlpha.100"
      pb="5"
    >
      <TopMenu />

      <Container
        marginTop="120px"
        height="100%"
        maxWidth="container.lg"
        display="flex"
        alignContent="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
          width="auto"
          margin="auto"
        >
          <Heading as="h3" size="lg">
            Olá
            {' '}
            {userData.firstName}
          </Heading>
          <Text mb="20px" fontSize="sm">
            Você é membro desde
            {' '}
            {dayjs(userData.created_at).format('DD-MM-YYYY')}
          </Text>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
          width="60%"
          height="auto"
          borderRadius="md"
          padding="30px"
          backgroundColor="whiteAlpha.200"
          shadow="md"
          margin="auto"
        >
          <Box
            width="100%"
            display="flex"
          >
            <FormControl id="firstName" mb="10px" mr="10px" width="50%">
              <FormLabel
                fontWeight="normal"
                marginBottom={0}
              >
                Primeiro nome
              </FormLabel>
              <Input
                type="text"
                focusBorderColor="blue.700"
                name="firstName"
                onChange={(e) => onChangeInputs(e)}
                value={userData.firstName}
              />
            </FormControl>

            <FormControl id="lastName" mb="10px" width="50%">
              <FormLabel
                fontWeight="normal"
                marginBottom={0}
              >
                Segundo nome
              </FormLabel>
              <Input
                type="text"
                focusBorderColor="blue.700"
                name="lastName"
                onChange={(e) => onChangeInputs(e)}
                value={userData.lastName}
              />
            </FormControl>
          </Box>

          <FormControl id="email" mb="20px">
            <FormLabel
              fontWeight="normal"
              marginBottom={0}
            >
              Endereço de email
            </FormLabel>
            <Input
              type="email"
              focusBorderColor="blue.700"
              name="email"
              onChange={(e) => onChangeInputs(e)}
              disabled
              value={userData.email}
            />
          </FormControl>

          <FormControl>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={handleUpdateProfile}
            >
              Salvar Alterações
              <CircularProgress
                hidden={isHiddenLoadingUpdateProfile}
                size={5}
                ml="2"
                isIndeterminate
                color="blue.1000"
              />
            </Button>
          </FormControl>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
          width="60%"
          height="auto"
          borderRadius="md"
          padding="30px"
          backgroundColor="whiteAlpha.200"
          shadow="md"
          margin="auto"
          mt="5"
        >
          <Heading as="h3" size="lg" mb="4">Alterar Senha</Heading>
          <Box
            width="100%"
            display="flex"
          >
            <FormControl id="oldPassword" mb="10px" mr="10px" width="50%">
              <FormLabel
                fontWeight="normal"
                marginBottom={0}
              >
                Senha atual
              </FormLabel>
              <Input
                type="password"
                focusBorderColor="blue.700"
                name="oldPassword"
                onChange={(e) => onChangeInputsPassword(e)}
                value={passwordData.oldPassword}
              />
            </FormControl>

            <FormControl id="newPassword" mb="20px" width="50%">
              <FormLabel
                fontWeight="normal"
                marginBottom={0}
              >
                Nova senha
              </FormLabel>
              <Input
                type="password"
                focusBorderColor="blue.700"
                name="newPassword"
                onChange={(e) => onChangeInputsPassword(e)}
                value={passwordData.newPassword}
              />
            </FormControl>
          </Box>

          <FormControl>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={changePassword}
            >
              Salvar Alterações
              <CircularProgress
                hidden={isHiddenLoadingChangePassword}
                size={5}
                ml="2"
                isIndeterminate
                color="blue.1000"
              />
            </Button>
          </FormControl>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
          width="60%"
          height="auto"
          borderRadius="md"
          padding="30px"
          backgroundColor="whiteAlpha.200"
          shadow="md"
          margin="auto"
          mt="5"
        >
          <Heading as="h3" size="lg" mb="4">Apagar conta</Heading>
          <Box
            width="100%"
            display="flex"
          >
            <Heading as="h5" size="sm">
              Esta operação não pode ser desfeita. Tenha certeza de que quer apagar sua conta.
            </Heading>
          </Box>

          <FormControl mt="4">
            <Button
              variant="solid"
              colorScheme="red"
              onClick={deactivateAccount}
            >
              Apagar conta
              <CircularProgress
                hidden={isHiddenLoadingDeactivateAccount}
                size={5}
                ml="2"
                isIndeterminate
                color="blue.1000"
              />
            </Button>
          </FormControl>
        </Box>
        <Footer />
      </Container>
    </Container>
  );
}
