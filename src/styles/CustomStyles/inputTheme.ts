import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    color: '#212529',
    _disabled: {},
    _autofill: {
      color: '#212529',
      textFillColor: "#212529",
      transition: "background-color 5000s ease-in-out 0s",
    },
    _hover: {
      borderColor: '#ced4da',
      color: '#212529',
      opacity: 0.9,
    }
  
  },
})

export const inputTheme = defineMultiStyleConfig({ baseStyle })