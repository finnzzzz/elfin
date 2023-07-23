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
        color: 'customNileBlue',
      },
      { icon: <PiTimerBold size='24px' />, text: 'Delay', type: 'delay', color: 'customOrange' },
    ],
  },
  {
    title: 'Interaction',
    items: [
      { icon: <MdAdsClick size='22px' />, text: 'Click', type: 'click', color: 'customGreen' },
      {
        icon: <LuTextCursorInput size='24px' />,
        text: 'Text',
        type: 'inputText',
        color: 'customPurple',
      },
      {
        icon: <IoList size='24px' />,
        text: 'Select',
        type: 'inputSelect',
        color: 'customRed',
      },
      {
        icon: <MdOutlineRadioButtonChecked size='22px' />,
        text: 'Radio',
        type: 'inputRadio',
        color: 'customDarkYellow',
      },
      {
        icon: <IoMdCheckboxOutline size='22px' />,
        text: 'Checkbox',
        type: 'inputCheckbox',
        color: 'customPink',
      },
      {
        icon: <LuSend size='20px' />,
        text: 'Enter Submit',
        type: 'enterSubmit',
        color: 'customDarkBlue',
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
        color: 'customDarkGreen',
      },
    ],
  },
];

export default nodeDatas;
