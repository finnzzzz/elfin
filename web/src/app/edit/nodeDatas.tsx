import { PiBrowsersDuotone } from 'react-icons/pi';
import { PiTimerBold } from 'react-icons/pi';
import { MdAdsClick } from 'react-icons/md';
import { LuTextCursorInput } from 'react-icons/lu';
import { IoList } from 'react-icons/io5';
import { MdOutlineRadioButtonChecked } from 'react-icons/md';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { TbTextRecognition } from 'react-icons/tb';
import { LuSend } from 'react-icons/lu';

const nodeDatas = [
  {
    title: 'Browser',
    items: [
      {
        icon: <PiBrowsersDuotone size='24px' />,
        text: 'New Tab',
        type: 'newTab',
        color: 'hover:border-customNileBlue-400 hover:text-customNileBlue-400',
      },
      {
        icon: <PiTimerBold size='24px' />,
        text: 'Delay',
        type: 'delay',
        color: 'hover:border-customOrange-400 hover:text-customOrange-400',
      },
    ],
  },
  {
    title: 'Interaction',
    items: [
      {
        icon: <MdAdsClick size='22px' />,
        text: 'Click',
        type: 'click',
        color: 'hover:border-customGreen-400 hover:text-customGreen-400',
      },
      {
        icon: <LuTextCursorInput size='24px' />,
        text: 'Text',
        type: 'inputText',
        color: 'hover:border-customPurple-400 hover:text-customPurple-400',
      },
      {
        icon: <IoList size='24px' />,
        text: 'Select',
        type: 'inputSelect',
        color: 'hover:border-customRed-400 hover:text-customRed-400',
      },
      {
        icon: <MdOutlineRadioButtonChecked size='22px' />,
        text: 'Radio',
        type: 'inputRadio',
        color: 'hover:border-customDarkYellow-400 hover:text-customDarkYellow-400',
      },
      {
        icon: <IoMdCheckboxOutline size='22px' />,
        text: 'Checkbox',
        type: 'inputCheckbox',
        color: 'hover:border-customPink-400 hover:text-customPink-400',
      },
      {
        icon: <LuSend size='20px' />,
        text: 'Enter Submit',
        type: 'enterSubmit',
        color: 'hover:border-customDarkBlue-400 hover:text-customDarkBlue-400',
      },
    ],
  },
  {
    title: 'Data',
    items: [
      {
        icon: <TbTextRecognition size='24px' />,
        text: 'Get Text',
        type: 'getContent',
        color: 'hover:border-customDarkGreen-400 hover:text-customDarkGreen-400',
      },
    ],
  },
];

export default nodeDatas;
