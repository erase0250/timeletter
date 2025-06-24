import Header from "../components/Header";
import Layout from "../components/Layout";

export default function LetterDetail() {
    return (
        <Layout>
            <Header type="default" title="편지 상세" />

            {/* 편지 본문 */}
            <div className="flex-1 px-6 py-3">
                <div className="rounded-md shadow-sm border border-[#eee5da] p-4 bg-[#FAF6F0]">
                    {/* 작성일 */}
                    <p className="text-xs text-gray-400 mb-1">
                        2025년 5월 16일 작성
                    </p>

                    {/* 제목 */}
                    <h1 className="text-main text-xl font-bold mb-4">
                        편지제목편지제목편지제목
                    </h1>

                    {/* 내용 + 배경 밑줄 */}
                    <div
                        className="text-[14px] text-gray-700 leading-[22px] whitespace-pre-wrap rounded-md px-1 pb-5"
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                                to bottom,
                                transparent 0px,
                                transparent 21px,
                                rgba(0, 0, 0, 0.08) 22px
                            )`,
                            backgroundPosition: "0 22px", // 밑줄 위치
                            backgroundSize: "100% 22px",
                        }}
                    >
                        왁아지자힝다 어더버가 아러는 툔주연, 으밍이
                        둡만오긴뵈넌을, 저스인소창, 마오거에서. 슡아다 악알우가
                        릉정골너부터 아도난훠산다를 시가앨니성이거나 릥간이
                        디하언낙니. 닝살 하잉횰 아으롤아 이모다 셔보 기겔아췽게
                        미긴허는 소오메 헤터근어요 사기. 지어래다 여타를
                        리났악겨잉먼린이에 주빠 오즌오는 하빈이 반께낙의 갠드를
                        아대괍니까. 앵샀며산에 레헤 가워즈빊노닝이 차뢰딘 주롭을
                        알져킬퍼 부트 내뎀당마그언엔습니다. 상거샐놌이
                        이귀박거어, 룬언츢훡 설파 긷오거로 혀몽치뻘에서 감롹을.
                        니치지맨습니다 팁마드넌 르민 화애덜 트죠만온지요 인간
                        셔르엄을. 라어칭알 다욘 옴솜은 니혼다 라슐핀농도.
                        갔힐줠죄련가를 켔다에소 텨나푸더몹지, 더열릴도는
                        여슨흠그어라. 른눠에 죡저와 럴가무를, 가이가 핑가펀워도
                        가읏뮈맨자. 주아대읕 운윰싑에 가흑어서 딤탁긴으려
                        게어아를 배워말뮈 태누벰온닌닌훙늣밊 틍래랑혈 밦맨애어
                        엤드다안잔조. 랑거를 나울손사내는, 조예다 나연으로
                        초아저모다, 산위베으다 조라가 리버딘다. 몰다다 머녁은
                        쁭추괜고 인즌 디프바그는 떤드가다 암블뉴, 효료딩아기게
                        종의 슬머보이다. 카엔다 부거며 수바헤를 린그는 른인
                        압솽저사렙은. 드얙으어다 놀디난 임인힐 뷰산 다. 어소식란
                        라강껴송은 으시흔기누가 젝래므 닌처로. 돈좄바
                        보줍오이를, 안오청직는다 겨선느거 머맨소말 훙베세요.
                        연앨그잔굽 지바산미는 뗜라맬이 큰덜도 지눙이라.
                    </div>
                </div>
            </div>
        </Layout>
    );
}
