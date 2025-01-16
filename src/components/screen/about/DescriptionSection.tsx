import AwardsSection from '@/components/screen/about/AwardsSection'
import { View, Text } from 'react-native'

const DescriptionSection = () => {
    return (
        <View className="w-full bg-ivory px-5 py-20">
            <AwardsSection />

            <View className="flex-1 gap-5 pt-20">
                <Text className="text-center font-semibold uppercase tracking-widest text-secondary">Mục tiêu của chúng tôi</Text>
                <Text className="font-serif text-3xl font-bold leading-[1.4]">
                    Giúp du khách có trải nghiệm tuyệt vời thông qua dịch vụ của chúng tôi!
                </Text>
                <Text className="font-semibold text-[#6E6E6E]">
                    Vị trí thuận lợi, phòng nghỉ tiện nghi, hiện đại và chất lượng phục vụ tốt là điểm tự tin nhất của chúng tôi! Chắc hẳn sẽ giúp bạn
                    có một chuyến đi thật hài lòng
                </Text>

                <View className="mt-5 gap-[30px]">
                    <View className="flex flex-col gap-5 rounded-3xl bg-white p-[30px]">
                        <Text className="font-serif text-2xl font-bold">Sứ mệnh của chúng tôi</Text>
                        <View className="border-t border-solid border-[#DADADA]"></View>
                        <View className="flex-row gap-[25px]">
                            <Text className="font-serif text-4xl font-bold text-secondary">01</Text>
                            <View className="flex-1">
                                <Text className="font-serif text-xl font-bold text-[#2D2D2D]">Trở thành khách sạn lý tưởng tại Vũng Tàu</Text>
                                <Text className="mt-2 text-justify text-lg text-[#6E6E6E]">Cung cấp dịch vụ và không gian lưu trú tốt nhất</Text>
                            </View>
                        </View>
                        <View className="flex-row gap-[25px]">
                            <Text className="font-serif text-4xl font-bold text-secondary">02</Text>
                            <View className="flex-1">
                                <Text className="font-serif text-xl font-bold text-[#2D2D2D]">Đáp ứng mọi mong đợi của du khách</Text>
                                <Text className="mt-2 text-justify text-lg text-[#6E6E6E]">Đáp ứng nhu cầu và mong đợi của mỗi du khách 24/24</Text>
                            </View>
                        </View>
                        <View className="flex-row gap-[25px]">
                            <Text className="font-serif text-4xl font-bold text-secondary">03</Text>
                            <View className="flex-1">
                                <Text className="font-serif text-xl font-bold text-[#2D2D2D]">Tạo ra những trải nghiệm khó quên</Text>
                                <Text className="mt-2 text-justify text-lg text-[#6E6E6E]">
                                    Mang lại trải nghiệm lưu trú khó quên cho mọi khách hàng
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="mt-[10px] gap-[30px]">
                    <View className="flex flex-col gap-5 rounded-3xl bg-white p-[30px]">
                        <Text className="font-serif text-xl font-bold text-[#2D2D2D]">"Stay Comfortably, Stay Happily, Stay Mate!"</Text>
                        <Text className="text-justify text-lg text-[#6E6E6E]">
                            Trải nghiệm sự kết hợp hoàn hảo giữa sự thoải mái và nét hiện đại tại khách sạn Stay Mate Hotel. Với lòng hiếu khách tận
                            tâm cùng không gian ấm cúng được trang trí độc nhất, chúng tôi đảm bảo mọi khoảnh khắc lưu trú của bạn đều như ở nhà. Niềm
                            hạnh phúc của bạn là ưu tiên hàng đầu của chúng tôi! {'\n'}
                            {'\n'} Dù bạn đến để nghỉ dưỡng, công tác hay khám phá, Stay Mate luôn sẵn sàng đáp ứng mọi nhu cầu của bạn. Từ những tiện
                            nghi hiện đại đến phong cách phục vụ chu đáo, chúng tôi mang đến trải nghiệm lưu trú vượt mong đợi, giúp bạn tận hưởng
                            từng giây phút đáng nhớ. Stay Mate Hotel - nơi hành trình của bạn trọn vẹn hơn bao giờ hết!
                        </Text>
                    </View>
                </View>
            </View>

            <View className="flex-1 gap-5 pt-20">
                <Text className="text-center font-semibold uppercase tracking-widest text-secondary">Quy trình hoạt động của chúng tôi</Text>
                <Text className="text-balance font-serif text-3xl font-bold leading-[1.4]">Lộ trình làm việc nhanh chóng và dễ dàng</Text>
                <View className="gap-[30px]">
                    <View className="flex flex-col items-center gap-5 px-[35px]">
                        <Text className="font-serif text-4xl font-bold text-secondary">01</Text>
                        <View>
                            <Text className="text-center font-serif text-xl font-bold text-[#2D2D2D]">Xác nhận đơn đặt phòng</Text>
                            <Text className="mt-2 text-center text-lg text-[#6E6E6E]">
                                Nhân viên của Stay Me Hotel sẽ liên hệ với bạn thông quan email/ số điện thoại để xác nhận đơn đặt phòng
                            </Text>
                        </View>
                    </View>
                    <View className="flex flex-col items-center gap-5 px-[35px]">
                        <Text className="font-serif text-4xl font-bold text-secondary">02</Text>
                        <View>
                            <Text className="text-center font-serif text-xl font-bold text-[#2D2D2D]">Thanh toán cọc 10%</Text>
                            <Text className="mt-2 text-center text-lg text-[#6E6E6E]">
                                Khi đơn đặt phòng được xác nhận, bạn sẽ được yêu cầu thanh toán trước 10% số tiền thuê phòng, và sẽ được trừ vào tổng
                                hóa đơn lúc thanh toán
                            </Text>
                        </View>
                    </View>
                    <View className="flex flex-col items-center gap-5 px-[35px]">
                        <Text className="font-serif text-4xl font-bold text-secondary">03</Text>
                        <View>
                            <Text className="text-center font-serif text-xl font-bold text-[#2D2D2D]">Gửi email xác nhận</Text>
                            <Text className="mt-2 text-center text-lg text-[#6E6E6E]">
                                Khi đã nhận tiện cọc, Stay Mate Hotel sẽ gửi cho bạn một email xác nhận đặt phòng thành công, bạn vui lòng xuất trình
                                email và CCCD khi nhận phòng
                            </Text>
                        </View>
                    </View>
                    <View className="flex flex-col items-center gap-5 px-[35px]">
                        <Text className="font-serif text-4xl font-bold text-secondary">04</Text>
                        <View>
                            <Text className="text-center font-serif text-xl font-bold text-[#2D2D2D]">Hoàn thành</Text>
                            <Text className="mt-2 text-center text-lg text-[#6E6E6E]">
                                Xin chúc mừng, bạn đã đặt phòng tại Stay Mate Hotel thành công!
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DescriptionSection
