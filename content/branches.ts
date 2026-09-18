import type { Branches } from './types';

export const branches = {
  dongdu: {
    title: 'Đi theo phong trào Đông Du',
    subtitle: 'Dựa vào Nhật Bản để đào tạo nhân lực và tìm ngoại viện',
    image: '/assets/phan_boi_chau.jpg',
    caption: 'Phan Bội Châu — ảnh tư liệu có sẵn.',
    background:
      'Đầu thế kỷ XX, Phan Bội Châu và Duy Tân Hội chủ trương đưa thanh niên sang Nhật học tập, kỳ vọng một nước châu Á đã canh tân có thể hỗ trợ Việt Nam giành độc lập.',
    contribution:
      'Khơi mạnh tinh thần yêu nước, mở tầm nhìn ra bên ngoài và tạo nên một lớp thanh niên có ý thức canh tân.',
    limit:
      'Hy vọng vào sự giúp đỡ của một cường quốc bên ngoài khiến phong trào phụ thuộc vào quan hệ quốc tế. Khi Nhật thỏa hiệp với Pháp, lưu học sinh Việt Nam bị trục xuất và phong trào tan rã.',
    lesson:
      'Độc lập không thể được bảo đảm chỉ bằng việc trông chờ một quốc gia khác.',
    question: 'Điểm giới hạn cốt lõi của lựa chọn này là gì?',
    answers: [
      'Thiếu lòng yêu nước',
      'Phụ thuộc nhiều vào ngoại viện',
      'Không có thanh niên tham gia',
    ],
    correct: 1,
  },
  reform: {
    title: 'Chọn con đường Duy Tân',
    subtitle: 'Khai dân trí, chấn dân khí, cải cách xã hội',
    image: '/assets/phan_chau_trinh_rgb.jpg',
    caption: 'Phan Châu Trinh — University of Oregon.',
    background:
      'Phan Châu Trinh nhấn mạnh giáo dục, dân quyền và cải cách xã hội. Ông phản đối bạo động vội vàng và muốn nâng cao năng lực tự quản của người dân.',
    contribution:
      'Đặt giáo dục, dân quyền và đổi mới xã hội vào trung tâm; góp phần đánh thức ý thức công dân và tinh thần cải cách.',
    limit:
      'Kỳ vọng chính quyền thực dân thực hiện cải cách sâu rộng khó giải quyết trực tiếp mâu thuẫn về chủ quyền dân tộc trong một chế độ thuộc địa.',
    lesson:
      'Cải cách xã hội có giá trị lâu dài, nhưng chưa tự nó trả lời câu hỏi giành lại chủ quyền bằng cách nào.',
    question:
      'Vì sao con đường này chưa giải quyết trọn vẹn bài toán năm 1911?',
    answers: [
      'Vì giáo dục không quan trọng',
      'Vì chưa trực tiếp giải quyết vấn đề chủ quyền',
      'Vì không có tư tưởng mới',
    ],
    correct: 1,
  },
  armed: {
    title: 'Tiếp tục khởi nghĩa vũ trang kiểu cũ',
    subtitle: 'Dựa vào căn cứ địa và sức chiến đấu tại địa phương',
    image: '/assets/hoang_hoa_tham.jpg',
    caption: 'Hoàng Hoa Thám — ảnh tư liệu báo chí.',
    background:
      'Khởi nghĩa Yên Thế do Hoàng Hoa Thám lãnh đạo là một trong những cuộc chống Pháp kéo dài nhất, dựa vào địa bàn rừng núi và sự ủng hộ của cư dân địa phương.',
    contribution:
      'Thể hiện sức bền, ý chí chiến đấu và khả năng dựa vào dân để chống lại bộ máy thuộc địa trong thời gian dài.',
    limit:
      'Phạm vi chủ yếu vẫn mang tính địa phương, thiếu một chương trình chính trị và tổ chức thống nhất đủ sức liên kết phong trào trên toàn quốc.',
    lesson:
      'Tinh thần chiến đấu là điều kiện cần, nhưng còn cần đường lối, tổ chức và lực lượng có quy mô toàn dân tộc.',
    question: 'Bài toán tổ chức nào vẫn còn bỏ ngỏ?',
    answers: [
      'Liên kết lực lượng trên phạm vi toàn quốc',
      'Xây thêm căn cứ địa phương',
      'Chỉ tăng số lượng vũ khí',
    ],
    correct: 0,
  },
  world: {
    title: 'Đi ra thế giới để khảo nghiệm',
    subtitle:
      'Quan sát các nước, hiểu bản chất thuộc địa và tìm một con đường mới',
    image: '/assets/latouche_treville.jpg',
    caption: 'Tàu Amiral Latouche-Tréville — ảnh tư liệu.',
    background:
      'Ngày 5/6/1911, Nguyễn Tất Thành rời Bến Nhà Rồng trên tàu Amiral Latouche-Tréville. Đây không phải một đáp án có sẵn, mà là khởi đầu của quá trình quan sát, lao động, học hỏi và kiểm nghiệm thực tế.',
    contribution:
      'Tạo điều kiện tiếp xúc trực tiếp với đời sống của người lao động và các dân tộc thuộc địa, đồng thời quan sát xã hội tư bản từ bên trong.',
    limit:
      'Ở thời điểm khởi hành, con đường giải phóng dân tộc vẫn chưa được xác định hoàn chỉnh.',
    lesson:
      'Đi để tìm hiểu, rồi dùng thực tiễn và lý luận để nhận ra con đường phù hợp với Việt Nam.',
    question: 'Điểm quan trọng nhất của quyết định này là gì?',
    answers: [
      'Đã có sẵn toàn bộ đáp án',
      'Khảo nghiệm thực tiễn để tìm một con đường mới',
      'Chỉ nhằm học nghề ở nước ngoài',
    ],
    correct: 1,
  },
} satisfies Branches;
