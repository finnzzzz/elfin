<h3 align='center'>
  <img width="700" alt="image" src="https://github.com/finnzzzz/elfin/assets/110927910/e6f47452-48c6-4b37-bc00-a3dc898e5344">
</h3>
<br>
<div align='center' >
  
  [<img height="26" alt="image" src="https://img.shields.io/badge/✨_Website-8729FF">](https://elfin.vercel.app/) [<img height="26" alt="image" src="https://img.shields.io/badge/⚙️_Chrome_extension-1.0.2-555555?labelColor=FF8F27">](https://chrome.google.com/webstore/detail/elfin-browser-automation/ojjgkgnnebfjcocfceidjnekcdamfjbf)  
  
</div>
<br>
<div align='center' >

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
<img height="28" alt="image" src="https://github.com/finnzzzz/elfin/assets/110927910/6efe97d7-6e83-41a2-bb96-a2049e4cd0b3">
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
<img height="28" alt="image" src="https://github.com/finnzzzz/elfin/assets/110927910/0bcc3427-caeb-45d1-a7dc-e0bf7553f741">

</div>

## elfin
elfin is a tool that makes `browser automation simple`, designed in an intuitively simple way that allows you to easily customize your own browser scripts, and execute the scripts in extension anytime and anywhere.

## About elfin
- Implemented the editing interface of the drag and drop node mode with `React-flow`.
- Leveraged `Firestore` for script data storage, enabling `synchronization` of content between the `web application` and `extension`, ensuring consistent displays across platforms.
- Integrated `Chrome extension API` to inject transformed scripts into targeted browsers for seamless execution.
- Complete email registration login and Google account login with `Firebase Auth`.
- Utilized `Zustand` for global state management.

## Flow chart
<h3 align='center'>
  
  <img width="800" alt="image" src="https://github.com/finnzzzz/elfin/assets/110927910/032fb08e-b10d-4a94-887f-a85a1e180ae6">
</h3>

## 📋 How to use
 
1. Login with your Google Account or create a new account if you don't have one.
2. After login there will be three templates at the top of the page.
3. If you haven't installed the elfin extension, download it from the [Chrome Web Store](https://chrome.google.com/webstore/detail/elfin-browser-automation/ojjgkgnnebfjcocfceidjnekcdamfjbf).
4. Once the extension is installed, go back to the page of elfin, open the extension, and click on "connect", you will see three templates on the extension synchronously.
5. Try to click the trigger of google search script in extension, it should start a google search automatically, if it doesn't respond, please reload the page once to connect the extension with window.
6. If you want to change the content of the search, click on the google search script and change the content of the input text to the keyword you want to search, or you can use the extension variable and fill it in the extension directly.

### Create your own script
1. Click on "Add script" in the bottom half of the page.
2. Click on script name to enter the editing page.
3. Change the name of the script to what you want.
4. Drag the nodes from the left side and connect them in the order you want.
5. Fill in the nodes with XPath and the required content.
6. Press the Save button in the upper right.
7. Open the extension and trigger it!

## Demo
<div align='center' >
  
*Add and edit a script*<br>
![demo1](https://github.com/finnzzzz/elfin/assets/110927910/f4de48f6-9c54-44ca-a1dc-ff40eb92c70d) 

*Youtube search with extension variable*<br>
![demo2](https://github.com/finnzzzz/elfin/assets/110927910/8b6634b5-8688-46c0-9848-716adbb8dbd5)

*Google search with specified content*<br>
![demo3](https://github.com/finnzzzz/elfin/assets/110927910/d8c57538-f5e9-4f74-bac1-fec230203454)

*Auto-complete google form*<br>
![demo4](https://github.com/finnzzzz/elfin/assets/110927910/2bbc3d96-9a6a-41b7-86a6-d51fd243a19b)
</div>
<br>

<div align='center'>
  
  <img width="300" alt="image" src="https://github.com/finnzzzz/elfin/assets/110927910/976ff10d-d211-43be-8306-12dec5da0c32">
</div>
<br>

## Troubleshooting👨🏻‍🔧
1. If the extension does not respond when triggered, try `reload the page` to re-establish the connection between the extension and the window.

## Future Features

- [ ] Record the execution of the script, displayed as a log
- [ ] Pin Script Function
- [ ] Limit and optimise node connections
- [ ] Add Select Element functionality to the extension

## Contact

<a href="mailto:finndev0303@gmail.com" target="_blank">![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)</a>
<a href="https://discordapp.com/users/361719252404928513" target="_blank">![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)</a>
