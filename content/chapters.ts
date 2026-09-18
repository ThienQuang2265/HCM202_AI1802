import type { Chapters } from './types';

export const chapters = {
  paths: {
    key: 'paths',
    label: 'Chặng 1 · Trước ngày 5/6/1911',
    title: 'Đứng trước ngã rẽ cứu nước',
    lead: 'Các phong trào đi trước đều chứa lòng yêu nước và những đóng góp đáng kể. Câu hỏi đặt ra là: con đường nào có thể đi xa hơn những giới hạn đã bộc lộ?',
    image: {
      src: '/assets/nha_rong_1911.jpg',
      alt: 'Bến Nhà Rồng',
      caption: 'Bến Nhà Rồng · Sài Gòn · 1911',
    },
    milestones: [],
    artifacts: [],
    context: [],
  },
  observe: {
    key: 'observe',
    label: 'Chặng 2 · 1911–1920',
    title: 'Thực tiễn đặt câu hỏi, lý luận mở đường',
    lead: 'Gần mười năm lao động, quan sát và hoạt động chính trị giúp Nguyễn Ái Quốc nhận ra: các lời tuyên bố về tự do chưa tự động đem lại quyền tự quyết cho dân tộc thuộc địa.',
    image: {
      src: '/assets/petition_1919.jpg',
      alt: 'Bản Yêu sách của nhân dân An Nam năm 1919',
      caption: 'Yêu sách của nhân dân An Nam · 1919',
    },
    milestones: [
      {
        year: '1917',
        title: 'Trở lại Pháp',
        description:
          'Tham gia hoạt động trong phong trào công nhân và đời sống chính trị Pháp; tiếp xúc trực tiếp với các tư tưởng tiến bộ.',
      },
      {
        year: '1919',
        title: 'Gửi bản Yêu sách',
        description:
          'Thay mặt nhóm người Việt yêu nước, Nguyễn Ái Quốc gửi Yêu sách của nhân dân An Nam đến Hội nghị Versailles. Những quyền tối thiểu không được đáp ứng.',
      },
      {
        year: '7/1920',
        title: 'Đọc Luận cương của Lênin',
        description:
          'Tìm thấy cách đặt vấn đề dân tộc và thuộc địa trong quan hệ với phong trào cách mạng thế giới.',
      },
      {
        year: '12/1920',
        title: 'Đại hội Tours',
        description:
          'Bỏ phiếu tán thành Quốc tế Cộng sản, tham gia sáng lập Đảng Cộng sản Pháp — bước chuyển từ người yêu nước đến người cộng sản.',
      },
    ],
    artifacts: [],
    context: [],
    question: {
      question: 'Yếu tố nào tạo nên bước chuyển quyết định năm 1920?',
      options: [
        'Chỉ một văn bản lý luận',
        'Sự gặp gỡ giữa trải nghiệm thực tiễn và lý luận giải phóng dân tộc',
        'Một lời hứa cải cách từ chính quốc',
      ],
      correct: 1,
      explanation:
        'Không phải lý luận tách rời đời sống: trải nghiệm về thuộc địa và lao động giúp Nguyễn Ái Quốc nhận ra ý nghĩa của Luận cương.',
    },
  },
  prepare: {
    key: 'prepare',
    label: 'Chặng 3 · 1920–1930',
    title: 'Từ nhận thức đến lực lượng có tổ chức',
    lead: 'Một con đường chỉ trở thành sức mạnh khi được truyền bá, có cán bộ, có tổ chức và có một chính đảng đủ năng lực lãnh đạo.',
    image: {
      src: '/assets/le_paria.jpg',
      alt: 'Báo Le Paria',
      caption: 'Le Paria · Diễn đàn chống chủ nghĩa thực dân',
    },
    milestones: [],
    artifacts: [],
    context: [],
  },
  challenge: {
    key: 'challenge',
    label: 'Chặng 4 · 1930–1941',
    title: 'Giữ vững mục tiêu, điều chỉnh cách đi',
    lead: 'Sau khi Đảng ra đời, cách mạng đối diện đàn áp, tranh luận đường lối và những biến động quốc tế. Câu hỏi không còn chỉ là “đi con đường nào”, mà là vận dụng thế nào cho đúng hoàn cảnh Việt Nam.',
    image: {
      src: '/assets/tours_1920.jpg',
      alt: 'Ảnh tư liệu phong trào cách mạng đầu thế kỷ XX',
      caption: 'Từ lựa chọn năm 1920 đến thử thách vận dụng',
    },
    milestones: [],
    artifacts: [],
    context: [
      {
        title: 'Đàn áp',
        description: 'Nhiều cơ sở cách mạng bị tổn thất',
      },
      {
        title: 'Tranh luận',
        description: 'Quan hệ giữa dân tộc và giai cấp',
      },
      {
        title: 'Chiến tranh',
        description: 'Tình hình thế giới biến đổi nhanh',
      },
    ],
    question: {
      question: 'Trước phê bình và biến động, lựa chọn nào phù hợp nhất?',
      options: [
        'Từ bỏ đường lối vì gặp khó khăn',
        'Áp dụng máy móc mọi chỉ dẫn, không xét hoàn cảnh Việt Nam',
        'Kiên định mục tiêu nhưng sáng tạo trong cách vận dụng vào vấn đề dân tộc',
      ],
      correct: 2,
      explanation:
        'Tư tưởng cốt lõi được kiểm nghiệm và phát triển trong thực tiễn: giải phóng dân tộc phải được đặt đúng vị trí trong hoàn cảnh thuộc địa.',
    },
  },
  liberation: {
    key: 'liberation',
    label: 'Chặng 5 · 1941–1945',
    title: 'Việc cấp bách nhất lúc này là gì?',
    lead: 'Năm 1941, Nguyễn Ái Quốc trở về nước sau ba mươi năm. Đông Dương chịu ách thống trị của Pháp và Nhật; nguy cơ mất nước, chiến tranh và nạn đói đẩy mâu thuẫn dân tộc lên cao nhất.',
    image: {
      src: '/assets/latouche_treville.jpg',
      alt: 'Tàu biển gợi hành trình từ lúc ra đi đến ngày trở về',
      caption: 'Từ cuộc ra đi năm 1911 đến ngày trở về năm 1941',
    },
    milestones: [],
    artifacts: [
      {
        year: '5/1941',
        title: 'Trung ương 8',
        description: 'Đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.',
      },
      {
        year: '1941',
        title: 'Việt Minh',
        description: 'Tập hợp rộng rãi các tầng lớp yêu nước.',
      },
      {
        year: '1944',
        title: 'Lực lượng vũ trang',
        description: 'Chuẩn bị lực lượng cho thời cơ cách mạng.',
      },
      {
        year: '8–9/1945',
        title: 'Độc lập',
        description: 'Cách mạng Tháng Tám và Tuyên ngôn Độc lập.',
      },
    ],
    context: [],
    question: {
      question: 'Trong hoàn cảnh đó, nhiệm vụ nào cần đặt lên hàng đầu?',
      options: [
        'Tiến hành ngay mọi nhiệm vụ giai cấp bất kể điều kiện',
        'Giải phóng dân tộc, tập hợp rộng rãi mọi lực lượng yêu nước',
        'Chờ chiến tranh thế giới kết thúc rồi mới hành động',
      ],
      correct: 1,
      explanation:
        'Hội nghị Trung ương 8 xác định giải phóng dân tộc là nhiệm vụ bức thiết; Việt Minh trở thành hình thức mặt trận đoàn kết rộng rãi.',
    },
  },
  independence: {
    key: 'independence',
    label: 'Chặng 6 · 1945–1969',
    title: 'Giành được độc lập — rồi phải giữ và làm cho độc lập có ý nghĩa',
    lead: 'Từ Nhà nước non trẻ đến hai cuộc kháng chiến, tư tưởng độc lập tiếp tục gắn với tự do của nhân dân, thống nhất đất nước và xây dựng một xã hội mới.',
    image: {
      src: '/assets/petition_1919.jpg',
      alt: 'Tư liệu về hành trình đòi quyền dân tộc',
      caption: 'Từ yêu sách về quyền dân tộc đến một nhà nước độc lập',
    },
    milestones: [
      {
        year: '1945–46',
        title: 'Bảo vệ chính quyền non trẻ',
        description:
          'Đối diện giặc đói, giặc dốt, ngoại xâm; tổ chức tổng tuyển cử và xây dựng nền tảng pháp lý của nhà nước mới.',
      },
      {
        year: '1946–54',
        title: 'Kháng chiến và kiến quốc',
        description:
          'Tiến hành cuộc kháng chiến toàn dân, toàn diện, trường kỳ, dựa vào sức mình là chính.',
      },
      {
        year: '1954–69',
        title: 'Hai nhiệm vụ chiến lược',
        description:
          'Xây dựng miền Bắc, đấu tranh giải phóng miền Nam, hướng tới thống nhất đất nước.',
      },
      {
        year: '1966',
        title: '“Không có gì quý hơn độc lập, tự do”',
        description:
          'Mệnh đề cô đọng giá trị cao nhất của chủ quyền dân tộc và quyền sống tự do.',
      },
      {
        year: '1969',
        title: 'Di chúc',
        description:
          'Gửi lại những căn dặn về đoàn kết, xây dựng Đảng, chăm lo con người và mục tiêu một nước Việt Nam hòa bình, thống nhất.',
      },
    ],
    artifacts: [],
    context: [],
    question: {
      question: 'Điều gì làm cho độc lập trở nên có ý nghĩa lâu dài?',
      options: [
        'Chỉ có một tuyên bố pháp lý',
        'Độc lập gắn với tự do, đời sống nhân dân và năng lực bảo vệ đất nước',
        'Tách mình khỏi mọi quan hệ quốc tế',
      ],
      correct: 1,
      explanation:
        'Độc lập là nền tảng, nhưng phải được bảo vệ và chuyển hóa thành quyền sống, quyền làm chủ và tương lai tốt đẹp hơn cho nhân dân.',
    },
  },
} satisfies Chapters;
