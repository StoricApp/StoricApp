import styles from './Landing.module.css'
import { Heading, Text, Button, VStack, Spacer, HStack, Divider, Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Landing() {
  const router = useRouter()

  return (
    <div className={styles.view}>
      <Image 
        src = {'/self-storage.jpeg'} 
        alt = 'storage facility'
        layout='fill'
      />
        <div className = {styles.gradient}>
          <VStack w = '60vw' spacing = {10} mb = {'10vh'}>
            <Heading as = 'h1' size = '2xl'>Storic App</Heading>
            <Text 
              fontSize = 'xl'
              color = {'gray'}
            >
              Storage management that takes minutes, not hours
            </Text>
            <Spacer />
            <HStack spacing = {5}>
              <Button 
                size = 'lg' 
                colorScheme={'green'} 
                onClick = {()=> router.push('/register')}
                variant='outline'
              >
                Register
              </Button>
              <Center height = {'20px'}>
                <Divider orientation = 'vertical' />
              </Center>
              <Button 
                size = 'lg' 
                colorScheme={'green'} 
                onClick = {()=> router.push('/login')}
              >
                Log In
              </Button>
            </HStack>
          </VStack>
        </div>
    </div>
  )
}
``