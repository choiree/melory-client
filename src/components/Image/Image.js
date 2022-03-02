import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AWS from 'aws-sdk';
import * as faceapi from 'face-api.js';
import findExpression from '../../utils/findExpression';
import findGenres from '../../utils/findGenres';

const ImageBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #2b3255;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;

  .box {
    width: 800px;
    height: 650px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    overflow: hidden;
    padding: 50px;
    margin-top: 10px;
    img {
      width: 100%;
    }

    canvas {
      position: absolute;
      border: 5px solid pink;
    }
  }

  i {
    font-size: 350px;
    color: #2b3255;
  }

  button,
  label {
    background: none;
    border: none;
    background: rgba(255, 255, 255, 0.5);
    padding: 8px 15px;
    margin: 10px 15px;
    border-radius: 5px;
    font-size: 16px;
    color: white;
    cursor: pointer;
  }

  .upload-name {
    display: inline-block;
    height: 40px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    width: 78%;
    color: #999999;
  }

  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;

export const Image = () => {
  const [progress, setProgress] = useState(0);
  const [selectesFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const handleImage = async () => {
      const detections = await faceapi
        .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const expressions = findExpression(detections);

      console.log('장르결과', findGenres(expressions));

      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        imgRef.current,
      );

      faceapi.matchDimensions(canvasRef.current, { width: 700, height: 600 });

      const resized = faceapi.resizeResults(detections, {
        width: 700,
        height: 600,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
      // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
    };
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ])
        .then(handleImage)
        .catch((e) => console.log(e));
    };

    imgRef.current && loadModels();
  }, [previewImage]);

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_S3_BUCKET },
    region: process.env.REACT_APP_RESION,
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const fileExt = file.name.split('.').pop();

      if (file.size >= 1 * 1024 * 1024) {
        alert('1mb 이하의 파일만 업로드 가능합니다.');
        return (e.target.value = null);
      }

      if (
        file.type !== 'image/png' &&
        file.type !== 'image/jpeg' &&
        fileExt !== 'jpg'
      ) {
        alert('이미지 파일만 업로드 가능합니다.');
        return (e.target.value = null);
      }

      setProgress(0);
      setSelectedFile(file);
      setPreviewImage(imageUrl);
    }
  };

  const uploadFile = async (file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: 'gallery/' + file.name,
    };

    myBucket
      .upload(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setSelectedFile(null);
          setPreviewImage(null);
        }, 3000);
      })
      .send((err, data) => {
        console.log(456, data.Location);
        setImageUrl(data.Location);
        if (err) console.log(err);
      });
  };
  //제일 큰 감정 두개 (수치랑 같이) 찾기 O
  //음원 장르 찾는 유틸 함수 로직 작성하기(감정 넣으면 장르와 밸런스 값 리턴) O
  //음원 찾는 API 작성하기(장르와 밸런스 값 넣으면 음원 리스트 리턴)
  //장르와 밸런스값으로 음원 추천 API 요청하기
  //받아온 음원리스트와 이미지 URL 과 함께 음원 선택 페이지로 보내주기
  //음원 선택 페이지에서 음원 선택하고 DB에 저장하기

  return (
    <ImageBackground>
      {showAlert ? (
        <div>업로드 진행률: {progress}%</div>
      ) : (
        !previewImage && <div>인물 사진을 선택해 주세요</div>
      )}
      <div className="box">
        {previewImage ? (
          <>
            <img ref={imgRef} src={previewImage} alt="priview Image" />
            <canvas ref={canvasRef}></canvas>
          </>
        ) : (
          <i className="fas fa-solid fa-image" />
        )}
      </div>
      <div>
        <label htmlFor="file">Upload</label>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileInput}
        />
        <button
          onClick={() => uploadFile(selectesFile)}
          disabled={selectesFile ? false : true}
        >
          Search
        </button>
      </div>
    </ImageBackground>
  );
};
