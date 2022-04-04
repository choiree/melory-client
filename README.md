# Melory

노래를 추천받고 나만의 뮤직 갤러리를 만들 수 있는 웹 애플리케이션 및 데스크톱 앱<br>
[🎶 Server Repository](https://github.com/choiree/melory-server)

## 배포 사이트

[🎵 Melory](https://www.choiree.world) <br>

**[테스트 계정 👉 아래 계정으로 로그인해서 멜로리를 경험해 보세요.]**<br>
ID: 31wystgegcixbi6a7vw7vpkgvsf4<br>
Password: test1234!

## 멜로리 소개

`Melody + Memory === Melory`<br>
그날의 감정이 담긴 사진으로 노래를 추천받으면 어떨까?<br>
혹은 지금 내 감정을 이모티콘으로 표현하고 노래를 추천받아서 들어보자!<br>
두 문장의 생각이 이번 프로젝트의 시작이었습니다.<br>

사진과 노래를 함께 저장하고 듣는다면 추억을 보고 들을 수 있다고 생각했습니다.<br>
추천받은 노래들로 갤러리를 채우고 언제든지 그날을 회상해 보세요.

## 실행 방법

### 원격 저장소 내려받기

```
$ git clone https://github.com/choiree/melory-client.git
$ npm install
```

### 환경 변수 설정

- #### FrontEnd

```
REACT_APP_SPOTIFY_CLIENT_ID=...
REACT_APP_SPOTIFY_CLIENT_SECRET=...
REACT_APP_REDIRECT_URI=http://localhost:3000
REACT_APP_BASE_URL=http://localhost:8000
REACT_APP_AWS_ACCESS_KEY=...
REACT_APP_AWS_SECRET_ACCESS_KEY=...
REACT_APP_RESION=ap-northeast-2
REACT_APP_S3_BUCKET=...
ELECTRON_ENABLE_LOGGING=1
```

- #### BackEnd

```
PORT=8000
CLIENT_URL=http://localhost:3000
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
DB_URL=...
ACCESS_TOKEN_SECRET=...
ACCESS_TOKEN_MAX_AGE=...
AWS_ACCESS_KEY=...
AWS_SECRET_ACCESS_KEY=...
RESION=...
S3_BUCKET=...
```

### 실행

- #### 웹 서비스

```
$ npm run react:start
```

- #### 데스크톱 앱

```
$ npm run electron-pack
$ npm run electron:start
```

<details><summary> macOS에서 앱 다운로드 하는 법 ✅
</summary>

- 'npm run electron-pack'까지 실행 후 dist 폴더에서 'Melory-0.1.0.dmg' 파일 실행

![title](https://user-images.githubusercontent.com/80485020/161477793-2b7f1f75-cf51-409b-89d8-4b09c681ca7d.png) ![title](https://user-images.githubusercontent.com/80485020/161477519-af71b4bb-4c8b-453c-8383-2b4df4d6dad8.png)

- 파일 실행 시 다음과 같은 화면에서 애플리케이션 폴더로 이동

![title](https://user-images.githubusercontent.com/80485020/161477788-89de75a0-4996-4e37-8e7b-948d1bb2fa18.png)

</details>

## 작업 기간

`2022년 2월 21일 ~ 2022년 3월 13일 (3주)`<br>

**1주차 - 기획 단계**

- 아이디어 수집 및 선정
- [Mock up](https://reinvented-ankle-62f.notion.site/Mockup-7d8d4f40da744793827e44e5780570fd)
- [DB schema modeling](https://reinvented-ankle-62f.notion.site/DB-schema-modeling-bc2b0dadfccd4a1b97ca6df4bee2e765)
- [기술 스택 검증](https://reinvented-ankle-62f.notion.site/e38aaac8945344118771a5476702b4d6)
- [Kanban](https://reinvented-ankle-62f.notion.site/a16e9a586b554ed8a6c5595aefdb490e?v=19a9ccab823f41de9698b6f1640d2314)

**2,3주차 - 개발 단계**

- 개발 환경 세팅
- 스포티파이 소셜 로그인 구현
- face-api.js 사용한 인물 사진 분석 페이지 구현
- 이모티콘 선택 페이지 구현
- 음원 추천 기능 및 음원 재생 기능 구현
- 사진 저장을 위한 AWS S3 연동
- 갤러리 페이지 구현
- D3.js를 이용한 시각화 페이지 구현
- Electron 프레임워크로 데스크톱 앱 구현
- Netlify, AWS Elastic Beanstalk 배포 및 CodePipeline 배포 자동화 구축

## 기술 스택

#### FrontEnd

- `React`, `Redux Toolkit`, `Electron`, `D3.js`, `face-api.js`, `styled-components`

#### BackEnd

- `Node.js`, `MongoDB`, `Mongoose`, `Express`, `JWT`, `AWS S3`

#### Deployment

- `Netlify`, `AWS Elastic Beanstalk`

## 주요 기능

|                                        메인 페이지 - 사진 감정 분석하고 노래 추천받기                                        |                                           메인 페이지 - 이모티콘으로 노래 추천받기                                           |
| :--------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
|  ![메인 - 사진 분석](https://user-images.githubusercontent.com/80485020/161252067-331beea5-8f77-431a-88e2-2cb105707b96.gif)  |   ![메인 - 이모지](https://user-images.githubusercontent.com/80485020/161252063-f12966f7-e221-4ffa-917a-5186734efeac.gif)    |
|                                         **갤러리 페이지 - 저장된 사진 및 노래 듣기**                                         |                                              **갤러리 페이지 - 사진 삭제하기**                                               |
| ![갤러리 - 노래 듣기](https://user-images.githubusercontent.com/80485020/161251918-444ede98-28e4-4b8c-9531-3854497dabb4.gif) | ![갤러리 - 사진 삭제](https://user-images.githubusercontent.com/80485020/161251931-7e566058-2a04-4ad7-8732-bb3e292932a1.gif) |
|                                            **시각화 페이지 - 노래 랜덤 재생하기**                                            |                                            **데스크톱 앱 - 실행 및 상태 바 조작**                                            |
|      ![일렉트론](https://user-images.githubusercontent.com/80485020/161251914-6f2c2eee-2c92-4b7b-9773-e621239df256.gif)      |      ![일렉트론](https://user-images.githubusercontent.com/80485020/161251911-f819685d-8343-4340-af60-9a61267859bc.gif)      |

## 챌린지

### React와 D3.js

이번 프로젝트를 하면서 처음으로 D3.js를 사용해 시각화라는 것을 시도해 보았습니다. 갤러리에 저장된 노래의 장르 데이터를 기반으로 사용자가 좋아하는 노래의 장르를 시각적으로 보여주고 애니메이션 효과를 주고 싶었기 때문입니다. <br>
D3.js를 하루 이틀 정도 공부하고 데이터를 어떻게 다루는지에 대해서 조사해 보았는데 쉽진 않았지만 화면에 그려지는 데이터들을 보면서 나름 재미있게 코드를 짤 수 있었던 것 같습니다.<br>
공부를 하면서 깨달은 점은 프로젝트를 React를 기반으로 진행하고 있었기 때문에 React의 성격과 D3.js의 성격이 조금 충돌하는 점이 있었는데 두 라이브러리 모두 DOM의 조작하려는 점이었습니다. D3.js는 하위 항목의 첨부와 업데이트를 통해 DOM을 수정하고, React는 요소의 상태가 변할 때마다 Virtual DOM 이랑 비교해가면서 자체적으로 DOM을 조작하려고 하기 때문입니다. <br> D3.js를 사용하는 과정에서 직접 DOM을 조작하면 React 로직과 충돌할 수 있기 때문에 직접적인 DOM 조작을 피하기 위해서 SVG path 계산, scale, layouts, transformations 등의 선/도형 등의 모양을 계산하는 것만 D3.js가 하게 하고 나머지는 React에게 맡기는 방식으로 진행하게 되었습니다.

### Electron으로 경험해본 데스크톱 앱

사실 처음부터 프로젝트 기획에 데스크톱 애플리케이션을 개발하는 계획은 없었습니다. 프로젝트를 진행하던 중 원하는 기능 구현이 스케줄보다 빨리 끝나게 되었고 조금 더 나아가서 데스크톱 애플리케이션을 도전해 보고 싶은 생각이 들었습니다. 애플리케이션을 적용시키기 위해서 Electron 프레임워크를 선택하였고 저는 단기간 동안 애플리케이션 구동과 Tray 기능으로 앱 실행 시 시스템 알림 영역에 아이콘과 메뉴 기능을 추가하였고 그 결과로 사용자 편의성을 증진시키려 노력하였습니다.<br>
구현 후 아쉬웠던 점은 데스크톱 앱만 실행 시에 단독으로 플레이어를 생성하지 못하고 브라우저에 Spotify나 Melory 웹 사이트의 플레이어가 생성되고 난 후 플레이어를 참조해야만 노래를 재생할 수 있는 이슈가 있습니다. Electron은 웹 페이지를 보여주기 위해 Chromium을 사용하기 때문에 현재 사용 중이던 Spotify web playback SDK 지원 브라우저에 포함되지 않는 점이 이유였습니다. 이러한 이슈는 기획 단계부터 데스크톱 앱을 기획한 것이 아니었기에 완벽하게 조사를 하고 시작하지 못한 점이 문제였다고 생각합니다. 시간이 조금 더 있었다면 이슈를 해결하는 것까지 마무리하고 싶었지만 2주 개발 기간 동안 추가 기능까지 구현하였기에 시간이 남지 않아 아쉬운 점으로 남게 되었습니다.<br>
하지만 처음으로 데스크톱 앱을 구현해 보고 Learning Curve가 조금 있었음에도 불구하고 구현하고자 했던 모든 기능은 완성시킬 수 있었던 점을 뿌듯하게 생각하고 있습니다. 다음에 기회가 된다면 처음부터 제대로 기획해서 Electron에 대해 더 공부하고 더 완성도 있는 데스톱 앱을 만들어 보고 싶습니다.

## 프로젝트를 마치며

제가 만들고 싶은 웹 서비스를 기획부터 개발까지 모두 혼자 하는 것은 처음이었기 때문에 두려움 반 설렘 반으로 시작했던 것 같습니다. 이번 프로젝트에서 제가 원하는 기능을 구현하기 위해서 라이브러리를 여러 가지 사용하였는데 시간이 한정적이기 때문에 완벽하게 파악하고 공부하기보다는 기능을 구현하기 위해서 최대한 빨리 습득하고 적용시키는 것에 초점을 맞추었던 것 같습니다. 그래서 하나의 기술을 집중해서 파고들지는 못한 점이 조금은 아쉬운 점으로 남는 것 같습니다.<br> 하지만 여러 진입장벽들을 오로지 혼자 겪으면서 고민도 많이 하고 습득하는 방법에 있어서 성장하게 된 것 같습니다. 더불어 혼자 스트레스를 관리하는 부분도 중요하다고 생각이 들었습니다. 어떠한 어려움이 있거나 스트레스를 받거나 스케줄에 지장이 생겨도 도움을 청할 사람 없이 제가 다 감당해야 하는 부분이었기에 많은 고충들을 겪으면서 성장할 수 있었고 힘들지만 하나씩 퀘스트를 달성하는 게임처럼 하자는 마인드로 즐겁게 코딩할 수 있었습니다.<br>
앞만 보고 달리다 보니 리팩토링, 최적화, 관심사의 분리 등 이런 부분에서 완벽하게 코드를 수정하지 못한 점도 아쉽지만 이번 경험을 계기로 앞으로는 이런 부분까지 생각하면서 나아진 코드를 작성할 수 있을 것 같고 더 나아가 조금 더 계획적으로 프로젝트를 완성하고 싶다는 생각이 들었습니다. 앞으로 계속해서 변하고 바뀌는 모습으로 성장하는 개발자가 되도록 노력하고 싶습니다.
