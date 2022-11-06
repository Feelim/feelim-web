import {RouteProp, useRoute} from '@react-navigation/core';
import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/color';
import MypageHeader from '../../components/Mypage/MypageHeader';
import NoticeContent from '../../components/Mypage/NoticeContent';
import {RootStackParamList} from '../types';

type HomeEventScreenRouteProp = RouteProp<RootStackParamList, 'HomeEvent'>;
const item = [
  {
    name: '런칭 이벤트',
    title: '필카의 A to Z! 찰칵과 함께 시작해 보세요.',
    date: '22.10.11.',
    content: `안녕하세요. ‘Chalkak’ 운영진입니다!
  
  찰칵 어플리케이션 런칭을 기념하여 이벤트를 준비했습니다.
  
  참여 방법은 간단합니다.
  
  1. ‘Chalkak’ 속 가장 마음에 드는 화면을 캡쳐합니다.
  2. SNS에 캡쳐한 이미지와 함께 전체 공개로 ‘123_chalkak’를 언급 혹은 태그 후 업로드합니다.
  3. 참여 완료되었습니다.
  
  이벤트 기간
  
  2022.11.00 ~ 11.00
  
  당첨자 발표
  
  2022.11.00
  
  - 비공개 계정일 경우 이벤트 확인이 안되므로 공개 계정으로 참여해 주세요.
  - 언급 혹은 태그가 올바르게 작성되어야 해요.
      `,
  },
  {
    name: '우리가 알아야 할 이야기',
    title: '우리가 알아야 할 [찰칵] 이야기 ',
    date: '22.10.11',
    content: `나는 가끔 세상에 내가 티켓을 사서 들어온 곳 같다.  

카메라가 없었다면 일어나지 않았을 것 같은, 세상은 내게 큰 공연이다.

Garry Winogrand

안녕하세요. ‘Chalkak’ 운영진입니다!

‘찰칵’은 원래 ‘찰그닥’의 준말이라고 합니다. 어느 순간부터 우리는 디지털 카메라에 더 익숙해졌고 항상 같은 ‘찰그닥’을 들어왔습니다. 어느 해, 전 길을 가던 중 다른 ‘찰그닥’소리를 듣게 됩니다. 어딘가 나사가 빠진듯한 한 박자 느린 ‘찰그닥’소리가 인상깊었습니다. 디지털 카메라와 사뭇 다른 외형의 카메라가 제 눈에 사로잡혔습니다.

그렇게 전 필름카메라를 접하게 되었습니다. 한정된 컷안에서 필름 사진을 찍다보면 피사체에 더 집중할 수 있었습니다. 집중하다 보니 어떻게 하면 필름카메라를 이용하여 ‘내가 보는 것 이상으로 담아낼 수 있을까.”라는 생각을 하게 된 거 같습니다. 

디지털 세대인 저는 폭풍 검색을 하기 시작했습니다. 하지만 검색을 통해 원하는 결과를 얻기는 쉽지 않았습니다. 오로지 필름카메라에 대해서 이야기를 하는 커뮤니티가 필요했습니다. 

‘Chalkak’은 이런 저뿐만이 아닌 필름카메라를 사용하는 사람들의 고민을 해소시키기 위한 서비스입니다. 필름카메라의 이야기를 저희 서비스에 담게 되어서 영광입니다. ‘Chalkak’의 성장을 함께 지켜봐 주시면 감사하겠습니다!
    `,
  },
];

function HomeEventScreen() {
  const {params} = useRoute<HomeEventScreenRouteProp>();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (params.idx === 1) {
      setName(item[0].name);
      setTitle(item[0].title);
      setDate(item[0].date);
      setContent(item[0].content);
    } else {
      setName(item[1].name);
      setTitle(item[1].title);
      setDate(item[1].date);
      setContent(item[1].content);
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.on_primary}}>
      <MypageHeader name={name} edit={false} complete={false} />
      <NoticeContent title={title} date={date} content={content} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default HomeEventScreen;
