/* 
    Eduardo Soutello - Computer Vision Portfolio
    Interactive Logic — v2.0
*/

import { GestureRecognizer, FilesetResolver, DrawingUtils } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";

/* ─── i18n — Translations ──────────────────────────────────── */
let currentLang = localStorage.getItem('lang') || 'pt';

const TRANSLATIONS = {
  pt: {
    'nav.about': 'Sobre', 'nav.skills': 'Habilidades', 'nav.experience': 'Experiência',
    'nav.projects': 'Projetos', 'nav.lab': 'Vision Lab', 'nav.contact': 'Contato',
    'hero.status': '<span class="blink">▶</span> System Status: <span class="text-green">ONLINE</span>',
    'hero.title.pre': 'Desenvolvedor de',
    'hero.title.main': 'Sistemas de Medição &amp; IA',
    'hero.desc': 'Engenheiro na <strong>WEG</strong> desenvolvendo sistemas de inspeção visual e qualidade industrial com Visão Computacional, LabVIEW e Python.',
    'hero.btn.explore': 'Explorar Projetos', 'hero.btn.connect': 'Init Connection',
    'hero.stat.exp': 'Anos de Exp.', 'hero.stat.company': 'Empresa Atual', 'hero.stat.team': 'Time de Atuação',
    'about.h2': 'Sistemas de Medição,<br>Visão Computacional &amp; IA',
    'about.p1': 'Sou <strong>Desenvolvedor de Sistemas de Medição na WEG</strong> — uma das maiores fabricantes de equipamentos elétricos do mundo — atuando no time de DSM em Jaraguá do Sul, SC.',
    'about.p2': 'Combino <strong>Visão Computacional</strong>, <strong>LabVIEW</strong> e <strong>Python</strong> para criar sistemas de inspeção e controle de qualidade em linha de produção industrial. Ex-pesquisador em parceria com a <strong>FAPESC</strong>, com passagens pela FI Group e Bradesco.',
    'meta.company.k': 'EMPRESA', 'meta.focus.k': 'FOCO', 'meta.location.k': 'LOCALIZAÇÃO',
    'meta.focus.v': 'Visão Computacional / Qualidade Industrial',
    'about.btn.contact': 'Contato Direto', 'about.btn.github': 'Ver GitHub',
    'skills.h2': 'Technical Stack',
    'skill.cv.p': 'YOLO, OpenCV, TensorRT, Semantic Segmentation, Object Tracking, OCR',
    'skill.ai.p': 'PyTorch, TensorFlow, Neural Networks, NLP, Generative AI',
    'skill.code.h3': 'Python / C++',
    'skill.code.p': 'High-Performance Computing, Backend Systems, Embedded &amp; Edge AI',
    'skill.mlops.p': 'Docker, CUDA, ONNX, Model Optimization, CI/CD Pipeline',
    'skill.embedded.h3': 'Sistemas Embarcados',
    'skill.embedded.p': 'Raspberry Pi, NVIDIA Jetson, Edge Deployment, Real-time Systems',
    'skill.web.p': 'FastAPI, REST APIs, WebSockets, JavaScript, React',
    'exp.h2': 'Timeline de Carreira',
    'exp.weg1.role': 'Desenvolvedor de Sistemas de Medição',
    'exp.weg1.company': 'WEG · Tempo Integral · Presencial',
    'exp.weg1.p': 'Responsável por realizar e orientar profissionais de nível júnior em atividades de desenvolvimento de sistemas para controle e garantia da qualidade em processo — atuando no projeto, documentação, desenvolvimento, adequação e correção. Negociação entre áreas e pesquisa de novas tecnologias de medição e inspeção, implementando inovações nos processos atuais.',
    'exp.weg2.role': 'Pesquisador em Visão Computacional',
    'exp.weg2.company': 'WEG · Temporário · Pesquisa FAPESC',
    'exp.weg2.p': 'Desenvolvimento de projeto de visão computacional para análise de qualidade de partes de motores (2D e 3D), sem impactar o ritmo de produção. Análise de fornecedores de hardware e software, execução de testes no laboratório de inovações tecnológicas do time de DSM. <strong>Pesquisa em parceria com a FAPESC.</strong>',
    'exp.fi.role': 'Consultor Técnico de TI Jr',
    'exp.fi.company': 'FI Group · Tempo Integral · Híbrido',
    'exp.fi.p': 'Consultoria especializada em inovação com base no manual de Frascati. Definição de cronogramas, planejamento estratégico para levantamento de dados das empresas. Elaboração de relatórios técnicos e defesa perante o MCTI. Atuação integrada com áreas comercial e jurídica.',
    'exp.bradesco.role': 'Analista de Projetos e Infraestrutura',
    'exp.bradesco.company': 'Bradesco · Estágio · Híbrido',
    'exp.bradesco.p': 'Atendimento de chamados e criação/manutenção de scripts na ferramenta de schedule IWS. Execução em ambientes de desenvolvimento, homologação e produção. Participação em reuniões de brainstorm com metodologia Ágil. Mapeamento de ativos para atualização programada de hardware.',
    'proj.h2': 'Projetos em Destaque',
    'proj.edge.h3': 'Real-time Edge Detection',
    'proj.edge.p': 'Sistema de detecção de objetos otimizado para dispositivos de borda com latência ultra-baixa, usando TensorRT FP16 e pipeline customizado em C++.',
    'proj.nav.h3': 'Autonomous Navigation',
    'proj.nav.p': 'Algoritmo de segmentação semântica para navegação indoor de robôs autônomos. Combina SLAM e visão para mapeamento dinâmico de ambientes.',
    'proj.ocr.h3': 'Multimeter OCR Engine',
    'proj.ocr.p': 'Engine customizado de OCR para leitura de displays de 7 segmentos em multímetros. Funciona em condições adversas de iluminação sem marcadores externos.',
    'proj.bio.h3': 'Biometric System',
    'proj.bio.p': 'Sistema de autenticação facial de alta precisão com detecção de vivacidade (liveness detection). Resistente a falsificações por foto/vídeo.',
    'proj.link': 'Ver Código', 'proj.cta': 'Ver todos os projetos no GitHub →',
    'lab.h2': 'Hand Gesture Lab',
    'lab.p': 'Experimente minha tecnologia de reconhecimento de gestos em tempo real, diretamente no seu navegador. Processamento 100% local — nenhum dado enviado.',
    'lab.mode.symbols': 'SÍMBOLOS', 'lab.mode.rps': 'JOKENPÔ',
    'lab.target.label': 'LETRA ALVO (LIBRAS / ASL)',
    'lab.rps.label': 'JOKENPÔ — Mostre sua jogada',
    'lab.rps.you': 'VOCÊ', 'lab.rps.ai': 'IA',
    'lab.fps': 'FPS:', 'lab.score': 'ACERTOS:',
    'lab.stream.label': 'FONTE DE VÍDEO (IP OPCIONAL)',
    'lab.btn.start': 'INICIAR CÂMERA',
    'lab.btn.stop.webcam': 'DESLIGAR CÂMERA',
    'lab.btn.stop.stream': 'DESLIGAR STREAM',
    'lab.btn.loading': 'CARREGANDO IA...',
    'lab.note': '🔒 Sua câmera não é gravada. Processamento 100% no navegador.',
    'rps.camera': 'Ligue a câmera!', 'rps.show': 'MOSTRE SUA JOGADA!',
    'rps.win': '🟢 VOCÊ GANHOU!', 'rps.lose': '🔴 IA GANHOU!', 'rps.draw': '🔵 EMPATE!',
    'contact.h2': 'Inicie uma<br><span class="gradient-text">Conexão</span>',
    'contact.p': 'Interessado em colaborar, discutir projetos de Visão Computacional, ou simplesmente trocar uma ideia sobre o futuro da IA? Minha caixa de entrada está aberta.',
    'contact.name.label': 'IDENTIFICAÇÃO', 'contact.name.ph': 'Seu nome',
    'contact.email.label': 'EMAIL', 'contact.email.ph': 'seu@email.com',
    'contact.msg.label': 'MENSAGEM', 'contact.msg.ph': 'Descreva seu projeto ou proposta...',
    'contact.submit': 'ENVIAR MENSAGEM',
    'form.err.required': '[ERRO] Preencha todos os campos.',
    'form.err.email': '[ERRO] Email inválido.',
    'form.success': '[OK] Cliente de email aberto. Obrigado pelo contato!',
    'form.sending': 'ABRINDO...',
    'footer.copy': '© 2026 Eduardo Soutello — Engineer // Developer // Visionary',
  },
  en: {
    'nav.about': 'About', 'nav.skills': 'Skills', 'nav.experience': 'Experience',
    'nav.projects': 'Projects', 'nav.lab': 'Vision Lab', 'nav.contact': 'Contact',
    'hero.status': '<span class="blink">▶</span> System Status: <span class="text-green">ONLINE</span>',
    'hero.title.pre': 'Developer of',
    'hero.title.main': 'Measurement &amp; AI Systems',
    'hero.desc': 'Engineer at <strong>WEG</strong> building visual inspection and industrial quality systems using Computer Vision, LabVIEW and Python.',
    'hero.btn.explore': 'Explore Projects', 'hero.btn.connect': 'Init Connection',
    'hero.stat.exp': 'Years Exp.', 'hero.stat.company': 'Current Company', 'hero.stat.team': 'Current Team',
    'about.h2': 'Measurement Systems,<br>Computer Vision &amp; AI',
    'about.p1': 'I am a <strong>Measurement Systems Developer at WEG</strong> — one of the world\'s largest manufacturers of electrical equipment — working in the DSM team in Jaraguá do Sul, SC.',
    'about.p2': 'I combine <strong>Computer Vision</strong>, <strong>LabVIEW</strong> and <strong>Python</strong> to build inspection and quality control systems on industrial production lines. Former researcher with <strong>FAPESC</strong>, with experience at FI Group and Bradesco.',
    'meta.company.k': 'COMPANY', 'meta.focus.k': 'FOCUS', 'meta.location.k': 'LOCATION',
    'meta.focus.v': 'Computer Vision / Industrial Quality',
    'about.btn.contact': 'Direct Contact', 'about.btn.github': 'View GitHub',
    'skills.h2': 'Technical Stack',
    'skill.cv.p': 'YOLO, OpenCV, TensorRT, Semantic Segmentation, Object Tracking, OCR',
    'skill.ai.p': 'PyTorch, TensorFlow, Neural Networks, NLP, Generative AI',
    'skill.code.h3': 'Python / C++',
    'skill.code.p': 'High-Performance Computing, Backend Systems, Embedded &amp; Edge AI',
    'skill.mlops.p': 'Docker, CUDA, ONNX, Model Optimization, CI/CD Pipeline',
    'skill.embedded.h3': 'Embedded Systems',
    'skill.embedded.p': 'Raspberry Pi, NVIDIA Jetson, Edge Deployment, Real-time Systems',
    'skill.web.p': 'FastAPI, REST APIs, WebSockets, JavaScript, React',
    'exp.h2': 'Career Timeline',
    'exp.weg1.role': 'Measurement Systems Developer',
    'exp.weg1.company': 'WEG · Full-time · On-site',
    'exp.weg1.p': 'Responsible for performing and guiding junior engineers in system development for process quality control — covering design, documentation, development, adaptation and correction. Cross-team negotiation and research of new measurement and inspection technologies.',
    'exp.weg2.role': 'Computer Vision Researcher',
    'exp.weg2.company': 'WEG · Contract · FAPESC Research',
    'exp.weg2.p': 'Developed a computer vision project for quality analysis of motor parts (2D &amp; 3D) without impacting production pace. Hardware and software vendor analysis, testing in the DSM innovation lab. <strong>Research in partnership with FAPESC.</strong>',
    'exp.fi.role': 'Jr IT Technical Consultant',
    'exp.fi.company': 'FI Group · Full-time · Hybrid',
    'exp.fi.p': 'Specialized consulting in innovation based on the Frascati manual. Scheduling, strategic planning, drafting technical reports and presenting to MCTI. Integrated work with commercial and legal departments.',
    'exp.bradesco.role': 'Project &amp; Infrastructure Analyst',
    'exp.bradesco.company': 'Bradesco · Internship · Hybrid',
    'exp.bradesco.p': 'Handling tickets and creating/maintaining scripts in the IWS scheduling tool. Execution across dev, staging and production environments. Agile brainstorm sessions. Asset mapping for scheduled hardware upgrades.',
    'proj.h2': 'Featured Projects',
    'proj.edge.h3': 'Real-time Edge Detection',
    'proj.edge.p': 'Object detection system optimized for edge devices with ultra-low latency using TensorRT FP16 and a custom C++ pipeline.',
    'proj.nav.h3': 'Autonomous Navigation',
    'proj.nav.p': 'Semantic segmentation algorithm for indoor navigation of autonomous robots. Combines SLAM and vision for dynamic environment mapping.',
    'proj.ocr.h3': 'Multimeter OCR Engine',
    'proj.ocr.p': 'Custom OCR engine for reading 7-segment displays on multimeters. Works in adverse lighting without external markers.',
    'proj.bio.h3': 'Biometric System',
    'proj.bio.p': 'High-precision facial authentication with liveness detection. Resistant to photo/video spoofing attacks.',
    'proj.link': 'View Code', 'proj.cta': 'View all projects on GitHub →',
    'lab.h2': 'Hand Gesture Lab',
    'lab.p': 'Experience my real-time gesture recognition technology directly in your browser. 100% local — no data sent.',
    'lab.mode.symbols': 'SYMBOLS', 'lab.mode.rps': 'RPS',
    'lab.target.label': 'TARGET LETTER (LIBRAS / ASL)',
    'lab.rps.label': 'RPS — Show your move',
    'lab.rps.you': 'YOU', 'lab.rps.ai': 'AI',
    'lab.fps': 'FPS:', 'lab.score': 'SCORE:',
    'lab.stream.label': 'VIDEO SOURCE (IP OPTIONAL)',
    'lab.btn.start': 'START CAMERA',
    'lab.btn.stop.webcam': 'STOP CAMERA',
    'lab.btn.stop.stream': 'STOP STREAM',
    'lab.btn.loading': 'LOADING AI...',
    'lab.note': '🔒 Camera is not recorded. 100% browser-side processing.',
    'rps.camera': 'Turn on camera!', 'rps.show': 'SHOW YOUR MOVE!',
    'rps.win': '🟢 YOU WIN!', 'rps.lose': '🔴 AI WINS!', 'rps.draw': '🔵 DRAW!',
    'contact.h2': 'Start a<br><span class="gradient-text">Connection</span>',
    'contact.p': 'Interested in collaborating, discussing Computer Vision projects, or just exchanging ideas about the future of AI? My inbox is open.',
    'contact.name.label': 'YOUR NAME', 'contact.name.ph': 'Your name',
    'contact.email.label': 'EMAIL', 'contact.email.ph': 'your@email.com',
    'contact.msg.label': 'MESSAGE', 'contact.msg.ph': 'Describe your project or proposal...',
    'contact.submit': 'SEND MESSAGE',
    'form.err.required': '[ERROR] Fill in all fields.',
    'form.err.email': '[ERROR] Invalid email.',
    'form.success': '[OK] Email client opened. Thank you!',
    'form.sending': 'OPENING...',
    'footer.copy': '© 2026 Eduardo Soutello — Engineer // Developer // Visionary',
  },
  es: {
    'nav.about': 'Sobre mí', 'nav.skills': 'Habilidades', 'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos', 'nav.lab': 'Vision Lab', 'nav.contact': 'Contacto',
    'hero.status': '<span class="blink">▶</span> Estado del Sistema: <span class="text-green">EN LÍNEA</span>',
    'hero.title.pre': 'Desarrollador de',
    'hero.title.main': 'Sistemas de Medición e IA',
    'hero.desc': 'Ingeniero en <strong>WEG</strong> desarrollando sistemas de inspección visual y calidad industrial con Visión por Computadora, LabVIEW y Python.',
    'hero.btn.explore': 'Explorar Proyectos', 'hero.btn.connect': 'Iniciar Conexión',
    'hero.stat.exp': 'Años de Exp.', 'hero.stat.company': 'Empresa Actual', 'hero.stat.team': 'Equipo Actual',
    'about.h2': 'Sistemas de Medición,<br>Visión por Computadora e IA',
    'about.p1': 'Soy <strong>Desarrollador de Sistemas de Medición en WEG</strong> — uno de los mayores fabricantes de equipos eléctricos del mundo — en el equipo DSM en Jaraguá do Sul, SC.',
    'about.p2': 'Combino <strong>Visión por Computadora</strong>, <strong>LabVIEW</strong> y <strong>Python</strong> para crear sistemas de inspección y control de calidad en líneas de producción industrial. Ex investigador con <strong>FAPESC</strong>, con experiencia en FI Group y Bradesco.',
    'meta.company.k': 'EMPRESA', 'meta.focus.k': 'ENFOQUE', 'meta.location.k': 'UBICACIÓN',
    'meta.focus.v': 'Visión por Computadora / Calidad Industrial',
    'about.btn.contact': 'Contacto Directo', 'about.btn.github': 'Ver GitHub',
    'skills.h2': 'Stack Técnico',
    'skill.cv.p': 'YOLO, OpenCV, TensorRT, Segmentación Semántica, Seguimiento de Objetos, OCR',
    'skill.ai.p': 'PyTorch, TensorFlow, Redes Neuronales, NLP, IA Generativa',
    'skill.code.h3': 'Python / C++',
    'skill.code.p': 'Computación de Alto Rendimiento, Sistemas Backend, IA Embebida y de Borde',
    'skill.mlops.p': 'Docker, CUDA, ONNX, Optimización de Modelos, Pipeline CI/CD',
    'skill.embedded.h3': 'Sistemas Embebidos',
    'skill.embedded.p': 'Raspberry Pi, NVIDIA Jetson, Despliegue en Borde, Sistemas en Tiempo Real',
    'skill.web.p': 'FastAPI, REST APIs, WebSockets, JavaScript, React',
    'exp.h2': 'Línea de Tiempo de Carrera',
    'exp.weg1.role': 'Desarrollador de Sistemas de Medición',
    'exp.weg1.company': 'WEG · Tiempo Completo · Presencial',
    'exp.weg1.p': 'Responsable de orientar a ingenieros junior en desarrollo de sistemas para control de calidad — diseño, documentación, desarrollo, adecuación y corrección. Negociación entre áreas e investigación de nuevas tecnologías de medición e inspección.',
    'exp.weg2.role': 'Investigador en Visión por Computadora',
    'exp.weg2.company': 'WEG · Temporal · Investigación FAPESC',
    'exp.weg2.p': 'Desarrollo de proyecto de visión por computadora para análisis de calidad de piezas de motores (2D y 3D). Análisis de proveedores, pruebas en laboratorio DSM. <strong>Investigación con FAPESC.</strong>',
    'exp.fi.role': 'Consultor Técnico de TI Jr',
    'exp.fi.company': 'FI Group · Tiempo Completo · Híbrido',
    'exp.fi.p': 'Consultoría especializada en innovación basada en el manual de Frascati. Cronogramas, planificación estratégica, informes técnicos y defensa ante el MCTI.',
    'exp.bradesco.role': 'Analista de Proyectos e Infraestructura',
    'exp.bradesco.company': 'Bradesco · Pasantía · Híbrido',
    'exp.bradesco.p': 'Atención de tickets y scripts en IWS. Ejecución en entornos de desarrollo, homologación y producción. Metodología Ágil. Mapeo de activos de hardware.',
    'proj.h2': 'Proyectos Destacados',
    'proj.edge.h3': 'Detección en Tiempo Real',
    'proj.edge.p': 'Sistema de detección de objetos para dispositivos de borde con latencia ultrabaja usando TensorRT FP16 y pipeline en C++.',
    'proj.nav.h3': 'Navegación Autónoma',
    'proj.nav.p': 'Algoritmo de segmentación semántica para robots autónomos indoor. SLAM + visión para mapeo dinámico.',
    'proj.ocr.h3': 'Motor OCR para Multímetros',
    'proj.ocr.p': 'OCR personalizado para displays de 7 segmentos. Funciona en condiciones adversas de iluminación.',
    'proj.bio.h3': 'Sistema Biométrico',
    'proj.bio.p': 'Autenticación facial de alta precisión con detección de vivacidad. Resistente a ataques por foto/video.',
    'proj.link': 'Ver Código', 'proj.cta': 'Ver todos los proyectos en GitHub →',
    'lab.h2': 'Laboratorio de Gestos',
    'lab.p': 'Experimenta mi tecnología de reconocimiento de gestos en tiempo real directamente en tu navegador. Procesamiento 100% local.',
    'lab.mode.symbols': 'SÍMBOLOS', 'lab.mode.rps': 'PIEDRA PAPEL TIJERA',
    'lab.target.label': 'LETRA OBJETIVO (LIBRAS / ASL)',
    'lab.rps.label': 'PIEDRA PAPEL TIJERA — Muestra tu jugada',
    'lab.rps.you': 'TÚ', 'lab.rps.ai': 'IA',
    'lab.fps': 'FPS:', 'lab.score': 'PUNTOS:',
    'lab.stream.label': 'FUENTE DE VIDEO (IP OPCIONAL)',
    'lab.btn.start': 'INICIAR CÁMARA',
    'lab.btn.stop.webcam': 'APAGAR CÁMARA',
    'lab.btn.stop.stream': 'APAGAR STREAM',
    'lab.btn.loading': 'CARGANDO IA...',
    'lab.note': '🔒 Tu cámara no es grabada. Procesamiento 100% local.',
    'rps.camera': '¡Enciende la cámara!', 'rps.show': '¡MUESTRA TU JUGADA!',
    'rps.win': '🟢 ¡GANASTE!', 'rps.lose': '🔴 ¡IA GANÓ!', 'rps.draw': '🔵 ¡EMPATE!',
    'contact.h2': 'Inicia una<br><span class="gradient-text">Conexión</span>',
    'contact.p': '¿Interesado en colaborar o discutir proyectos de Visión por Computadora? Mi bandeja de entrada está abierta.',
    'contact.name.label': 'IDENTIFICACIÓN', 'contact.name.ph': 'Tu nombre',
    'contact.email.label': 'EMAIL', 'contact.email.ph': 'tu@email.com',
    'contact.msg.label': 'MENSAJE', 'contact.msg.ph': 'Describe tu proyecto o propuesta...',
    'contact.submit': 'ENVIAR MENSAJE',
    'form.err.required': '[ERROR] Completa todos los campos.',
    'form.err.email': '[ERROR] Email inválido.',
    'form.success': '[OK] Cliente de correo abierto. ¡Gracias!',
    'form.sending': 'ABRIENDO...',
    'footer.copy': '© 2026 Eduardo Soutello — Ingeniero // Desarrollador // Visionario',
  },
  zh: {
    'nav.about': '关于', 'nav.skills': '技能', 'nav.experience': '经历',
    'nav.projects': '项目', 'nav.lab': '视觉实验室', 'nav.contact': '联系',
    'hero.status': '<span class="blink">▶</span> 系统状态: <span class="text-green">在线</span>',
    'hero.title.pre': '开发者',
    'hero.title.main': '测量与人工智能系统',
    'hero.desc': '<strong>WEG</strong> 工程师，使用计算机视觉、LabVIEW 和 Python 开发工业质量检测系统。',
    'hero.btn.explore': '探索项目', 'hero.btn.connect': '建立连接',
    'hero.stat.exp': '年经验', 'hero.stat.company': '当前公司', 'hero.stat.team': '当前团队',
    'about.h2': '测量系统，<br>计算机视觉与人工智能',
    'about.p1': '我是 <strong>WEG 测量系统开发工程师</strong>，WEG 是全球最大电气设备制造商之一，在 DSM 团队工作。',
    'about.p2': '我将<strong>计算机视觉</strong>、<strong>LabVIEW</strong> 和 <strong>Python</strong> 结合，为工业生产线创建检测和质量控制系统。曾与 <strong>FAPESC</strong> 合作研究，在 FI Group 和 Bradesco 有工作经历。',
    'meta.company.k': '公司', 'meta.focus.k': '专注领域', 'meta.location.k': '位置',
    'meta.focus.v': '计算机视觉 / 工业质量控制',
    'about.btn.contact': '直接联系', 'about.btn.github': '查看 GitHub',
    'skills.h2': '技术栈',
    'skill.cv.p': 'YOLO, OpenCV, TensorRT, 语义分割, 目标跟踪, OCR',
    'skill.ai.p': 'PyTorch, TensorFlow, 神经网络, NLP, 生成式 AI',
    'skill.code.h3': 'Python / C++',
    'skill.code.p': '高性能计算, 后端系统, 嵌入式与边缘 AI',
    'skill.mlops.p': 'Docker, CUDA, ONNX, 模型优化, CI/CD 流水线',
    'skill.embedded.h3': '嵌入式系统',
    'skill.embedded.p': 'Raspberry Pi, NVIDIA Jetson, 边缘部署, 实时系统',
    'skill.web.p': 'FastAPI, REST APIs, WebSockets, JavaScript, React',
    'exp.h2': '职业时间线',
    'exp.weg1.role': '测量系统开发工程师',
    'exp.weg1.company': 'WEG · 全职 · 现场办公',
    'exp.weg1.p': '负责指导初级工程师开发质量控制系统，涵盖设计、文档、开发、适配和纠错。跨部门协调，研究新型测量检测技术。',
    'exp.weg2.role': '计算机视觉研究员',
    'exp.weg2.company': 'WEG · 合同制 · FAPESC 研究',
    'exp.weg2.p': '开发计算机视觉项目，分析电机零件（2D化3D）质量，不影响生产节奏。<strong>与 FAPESC 合作研究。</strong>',
    'exp.fi.role': '初级 IT 技术顾问',
    'exp.fi.company': 'FI Group · 全职 · 混合办公',
    'exp.fi.p': '基于 Frascati 手册的专业创新和技术和顾问。制定时间表、起草技术报告、展示成果。',
    'exp.bradesco.role': '项目与基础设施分析师',
    'exp.bradesco.company': 'Bradesco · 实习 · 混合办公',
    'exp.bradesco.p': '处理工单和 IWS 调度脚本。在开发、测试、生产环境中执行。敏捷头脑风暴会议。硬件资产映射。',
    'proj.h2': '精选项目',
    'proj.edge.h3': '实时边缘检测',
    'proj.edge.p': '采用 TensorRT FP16 和自定义 C++ 流水线，为边缘设备优化的超低延迟目标检测系统。',
    'proj.nav.h3': '自主导航',
    'proj.nav.p': '自主机器人室内导航的语义分割算法。结合 SLAM 和视觉进行动态环境映射。',
    'proj.ocr.h3': '万用表 OCR 引擎',
    'proj.ocr.p': '用于读取7段式显示屏的自定义 OCR 引擎。无需外部标记，在恶劣光照条件下工作。',
    'proj.bio.h3': '生物识别系统',
    'proj.bio.p': '高精度人脸认证，具备活体检测功能。抗照片/视频欺骗攻击。',
    'proj.link': '查看代码', 'proj.cta': '在 GitHub 上查看所有项目 →',
    'lab.h2': '手势识别实验室',
    'lab.p': '直接在浏览器中体验我的实时手势识别技术。100% 本地处理—无数据上传。',
    'lab.mode.symbols': '符号', 'lab.mode.rps': '猜拳',
    'lab.target.label': '目标字母 (LIBRAS / ASL)',
    'lab.rps.label': '猜拳 — 展示你的手势',
    'lab.rps.you': '你', 'lab.rps.ai': 'AI',
    'lab.fps': 'FPS:', 'lab.score': '得分:',
    'lab.stream.label': '视频源 (可选 IP)',
    'lab.btn.start': '启动摄像头',
    'lab.btn.stop.webcam': '关闭摄像头',
    'lab.btn.stop.stream': '关闭推流',
    'lab.btn.loading': '加载 AI...',
    'lab.note': '🔒 您的摄像头不会被录制。100% 浏览器端处理。',
    'rps.camera': '请开启摄像头!', 'rps.show': '展示你的手势!',
    'rps.win': '🟢 你赢了!', 'rps.lose': '🔴 AI赢了!', 'rps.draw': '🔵 平局!',
    'contact.h2': '开始<br><span class="gradient-text">连接</span>',
    'contact.p': '有意合作、讨论计算机视觉项目，或交流 AI 未来的想法？我的邮笱随时开放。',
    'contact.name.label': '姓名', 'contact.name.ph': '您的姓名',
    'contact.email.label': '邮笱', 'contact.email.ph': 'your@email.com',
    'contact.msg.label': '留言', 'contact.msg.ph': '描述您的项目或提案...',
    'contact.submit': '发送消息',
    'form.err.required': '[错误] 请填写所有字段。',
    'form.err.email': '[错误] 电子邮件无效。',
    'form.success': '[成功] 邮件客户端已开启。谢谢！',
    'form.sending': '打开中...',
    'footer.copy': '© 2026 Eduardo Soutello — 工程师 // 开发者 // 远见者',
  },
};

/** Retorna a tradução da chave no idioma atual, com fallback para PT */
function t(key) {
    return (TRANSLATIONS[currentLang]?.[key]) ?? (TRANSLATIONS.pt[key]) ?? key;
}

/** Aplica todas as traduções ao DOM e salva idioma */
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'zh' ? 'zh-CN' : lang;

    document.querySelectorAll('.lang-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.lang === lang)
    );

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const v = t(el.dataset.i18n);
        if (v !== undefined) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const v = t(el.dataset.i18nHtml);
        if (v !== undefined) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const v = t(el.dataset.i18nPlaceholder);
        if (v !== undefined) el.placeholder = v;
    });
}

function initI18n() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
    // Aplica idioma salvo (ou PT por padrão)
    setLanguage(currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-enabled');

    initI18n();         // idioma primeiro
    initHeader();
    initMobileNav();
    initVisionOverlay();
    initScrollAnimations();
    initSkillBars();
    initGlitchEffect();
    initContactForm();
    initLab();

    console.log(
        "%c[SYSTEM] Visual Cortex Initialized. Status: OPTIMAL",
        "color: #00ff41; font-family: monospace; font-weight: bold; font-size: 13px;"
    );
});

/* ─── HEADER: scroll shrink ─────────────────────────────────── */

function initHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const onScroll = () => {
        header.style.background = window.scrollY > 50
            ? 'rgba(5, 5, 8, 0.98)'
            : 'rgba(5, 5, 8, 0.9)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
}

/* ─── MOBILE NAV ─────────────────────────────────────────────── */

function initMobileNav() {
    const btn = document.getElementById('hamburger-btn');
    const nav = document.getElementById('main-nav');
    if (!btn || !nav) return;

    const toggle = () => {
        const open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        nav.classList.toggle('nav-open', !open);
        document.body.style.overflow = open ? '' : 'hidden';
    };

    btn.addEventListener('click', toggle);

    // Close on nav link click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            btn.setAttribute('aria-expanded', 'false');
            nav.classList.remove('nav-open');
            document.body.style.overflow = '';
        });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
            btn.setAttribute('aria-expanded', 'false');
            nav.classList.remove('nav-open');
            document.body.style.overflow = '';
        }
    });
}

/* ─── VISION OVERLAY (Hero bounding boxes) ───────────────────── */

function initVisionOverlay() {
    const overlay = document.getElementById('vision-overlay');
    if (!overlay) return;

    const detections = [
        { label: 'Neural_Core',   x: 12, y: 20, w: 42, h: 50, color: 'var(--cyan)' },
        { label: 'Deep_Matrix',   x: 60, y: 8,  w: 32, h: 40, color: 'var(--magenta)' },
        { label: 'Vision_Stream', x: 5,  y: 72, w: 25, h: 22, color: 'var(--green)' },
    ];

    detections.forEach((det, i) => {
        setTimeout(() => {
            const box = document.createElement('div');
            box.className = 'bounding-box';
            box.style.cssText = `
                left: ${det.x}%;
                top: ${det.y}%;
                width: ${det.w}%;
                height: ${det.h}%;
                border-color: ${det.color};
            `;
            box.setAttribute('data-label', det.label);
            overlay.appendChild(box);
        }, i * 500);
    });
}

/* ─── SCROLL ANIMATIONS ──────────────────────────────────────── */

function initScrollAnimations() {
    const observer = new IntersectionObserver(
        entries => entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('visible');
        }),
        { threshold: 0.08 }
    );

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ─── SKILL BARS: animate on scroll ─────────────────────────── */

function initSkillBars() {
    const observer = new IntersectionObserver(
        entries => entries.forEach(e => {
            if (e.isIntersecting) {
                const fill = e.target;
                const target = fill.dataset.width || '0';
                fill.style.width = target + '%';
                observer.unobserve(fill);
            }
        }),
        { threshold: 0.5 }
    );

    document.querySelectorAll('.skill-bar__fill').forEach(el => observer.observe(el));
}

/* ─── GLITCH EFFECT ──────────────────────────────────────────── */

function initGlitchEffect() {
    const el = document.querySelector('.glitch-text');
    if (!el) return;

    setInterval(() => {
        if (Math.random() > 0.94) {
            const dx = (Math.random() * 6 - 3).toFixed(1);
            const dy = (Math.random() * 3 - 1.5).toFixed(1);
            el.style.transform = `translate(${dx}px, ${dy}px)`;
            el.style.filter = 'hue-rotate(80deg) brightness(1.2)';
            setTimeout(() => {
                el.style.transform = '';
                el.style.filter = '';
            }, 80);
        }
    }, 200);
}

/* ─── CONTACT FORM ───────────────────────────────────────────── */

function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('form-submit-btn');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name    = form.querySelector('#contact-name').value.trim();
        const email   = form.querySelector('#contact-email').value.trim();
        const message = form.querySelector('#contact-message').value.trim();

        if (!name || !email || !message) {
            showFeedback(feedback, 'error', '[ERROR] Preencha todos os campos.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFeedback(feedback, 'error', '[ERROR] Email inválido.');
            return;
        }

        // Compose mailto link as fallback (no backend needed)
        const subject = encodeURIComponent(`[Portfolio] Mensagem de ${name}`);
        const body    = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${message}`);
        const mailto  = `mailto:eduardosoutellodev@gmail.com?subject=${subject}&body=${body}`;

        submitBtn.textContent = 'ABRINDO...';
        submitBtn.disabled = true;

        window.location.href = mailto;

        setTimeout(() => {
            showFeedback(feedback, 'success', '[SUCCESS] Cliente de email aberto. Obrigado pelo contato!');
            form.reset();
            submitBtn.textContent = 'ENVIAR MENSAGEM';
            submitBtn.disabled = false;
        }, 500);
    });
}

function showFeedback(el, type, msg) {
    if (!el) return;
    el.textContent = msg;
    el.className = `form-feedback ${type}`;
    setTimeout(() => {
        el.textContent = '';
        el.className = 'form-feedback';
    }, 5000);
}

/* ─── HAND GESTURE LAB ───────────────────────────────────────── */

let gestureRecognizer = null;
let webcamRunning = false;
let videoSourceType = 'webcam';
let currentMode = 'symbols'; // 'symbols' | 'rps'
let score = 0;
let lastVideoTime = -1;
let lastGesture = '';
let lastPredictTime = 0;
let rpsPhase = 'idle'; // 'idle' | 'countdown' | 'capture' | 'result'

const video      = document.getElementById('webcam');
const ipImage    = document.getElementById('webcam-ip');
const canvas     = document.getElementById('output_canvas');
const canvasCtx  = canvas ? canvas.getContext('2d') : null;

const gestureNameEl       = document.getElementById('gesture-name');
const gestureConfidenceEl = document.getElementById('gesture-confidence');
const startBtn            = document.getElementById('start-camera');
const streamUrlInput      = document.getElementById('stream-url');
const fpsDisplay          = document.getElementById('fps-counter');
const scoreDisplay        = document.getElementById('score-counter');
const targetDisplay       = document.getElementById('target-gesture');

/*
 * Mapeamento dos gestos do MediaPipe para letras da Libras / ASL.
 * O modelo pré-treinado reconhece 7 gestos — aqui cada um é associado
 * à letra/sinal mais próximo nas línguas de sinais.
 *
 * Gesto MediaPipe   → Libras / ASL
 * ─────────────────────────────────
 * Thumb_Up          → A  (polegar levantado)
 * Victory           → V  (dedos indicador + médio abertos)
 * Open_Palm         → B  (mão aberta, dedos juntos)
 * Closed_Fist       → S  (mão fechada / punho)
 * Pointing_Up       → D  (dedo indicador apontando)
 * ILoveYou          → I LOVE YOU (🤟 — sinal universal ASL/Libras)
 * None              → —  (nenhuma mão detectada)
 */
const GESTURE_MAP = {
    Thumb_Up:    { letter: 'A',         hint: 'Polegar ↑' },
    Victory:     { letter: 'V',         hint: 'Indicador + Médio' },
    Open_Palm:   { letter: 'B',         hint: 'Mão Aberta' },
    Closed_Fist: { letter: 'S',         hint: 'Punho Fechado' },
    Pointing_Up: { letter: 'D',         hint: 'Indicador ↑' },
    ILoveYou:    { letter: '🤟',        hint: 'I Love You' },
};

// Lista de letras para o desafio
const LETTERS_LIST = Object.values(GESTURE_MAP).map(g => g.letter);

/*
 * Mapeamento para Jokenpô (Rock-Paper-Scissors)
 * Closed_Fist → Pedra | Open_Palm → Papel | Victory → Tesoura
 */
const RPS_MAP = {
    Closed_Fist: { name: 'PEDRA',   emoji: '🪨' },
    Open_Palm:   { name: 'PAPEL',   emoji: '📰' },
    Victory:     { name: 'TESOURA', emoji: '✂️' },
};
const RPS_CHOICES = Object.values(RPS_MAP);

// Regras: quem bate quem
const RPS_BEATS = {
    'PEDRA':   'TESOURA',
    'PAPEL':   'PEDRA',
    'TESOURA': 'PAPEL',
};

async function initLab() {
    if (!startBtn) return;

    // Troca de modo
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            setMode(e.currentTarget.dataset.mode);
        });
    });

    startBtn.addEventListener('click', toggleWebcam);
    nextLetter();

    // Load MediaPipe
    try {
        const vision = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
        );
        gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: 'https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task',
                delegate: 'GPU',
            },
            runningMode: 'VIDEO',
            numHands: 2,
        });
        startBtn.textContent = 'INICIAR CÂMERA';
        startBtn.disabled = false;
        console.log('[LAB] GestureRecognizer loaded ✓');
    } catch (err) {
        console.error('[LAB] Failed to load GestureRecognizer', err);
        startBtn.textContent = 'ERRO: IA indisponível';
    }
}

function setMode(mode) {
    currentMode = mode;
    score = 0;
    if (scoreDisplay) scoreDisplay.textContent = '0';
    lastGesture = '';
    rpsPhase = 'idle';

    const symbolsPanel = document.getElementById('symbols-panel');
    const rpsPanel     = document.getElementById('rps-panel');

    if (mode === 'symbols') {
        if (symbolsPanel) symbolsPanel.style.display = 'block';
        if (rpsPanel)     rpsPanel.style.display     = 'none';
        nextLetter();
    } else {
        if (symbolsPanel) symbolsPanel.style.display = 'none';
        if (rpsPanel)     rpsPanel.style.display     = 'block';
        // Só inicia countdown se a câmera já estiver ligada
        if (webcamRunning) startRPSRound();
        else resetRPSUI();
    }
}

/* Limpa a UI sem iniciar countdown (estado de espera) */
function resetRPSUI() {
    rpsPhase = 'idle';
    const playerEl = document.getElementById('rps-player');
    const cpuEl    = document.getElementById('rps-cpu');
    const resultEl = document.getElementById('rps-result');
    if (playerEl) { playerEl.textContent = '❓'; playerEl.classList.remove('reveal'); }
    if (cpuEl)    { cpuEl.textContent    = '❓'; cpuEl.classList.remove('reveal'); }
    if (resultEl) { resultEl.textContent = 'Ligue a câmera!'; resultEl.className = 'rps-result'; }
    lastGesture = '';
}

/* Contagem regressiva 3 → 2 → 1 → JOKENPÔ! e então captura */
function startRPSRound() {
    rpsPhase = 'countdown';
    lastGesture = '';

    const playerEl = document.getElementById('rps-player');
    const cpuEl    = document.getElementById('rps-cpu');
    const resultEl = document.getElementById('rps-result');

    if (playerEl) { playerEl.textContent = '❓'; playerEl.classList.remove('reveal'); }
    if (cpuEl)    { cpuEl.textContent    = '❓'; cpuEl.classList.remove('reveal'); }

    const steps = [
        { text: '3',         cls: 'rps-result rps-countdown' },
        { text: '2',         cls: 'rps-result rps-countdown' },
        { text: '1',         cls: 'rps-result rps-countdown' },
        { text: 'JOKENPÔ!', cls: 'rps-result rps-go' },
    ];
    let i = 0;

    const tick = () => {
        if (resultEl) {
            resultEl.textContent = steps[i].text;
            resultEl.className   = steps[i].cls;
        }
        i++;
        if (i < steps.length) {
            setTimeout(tick, 800);
        } else {
            // Após "JOKENPÔ!" aguarda mais 400ms e abre captura
            setTimeout(() => {
                rpsPhase = 'capture';
                if (resultEl) {
                    resultEl.textContent = t('rps.show');
                    resultEl.className   = 'rps-result rps-capture';
                }
            }, 600);
        }
    };
    tick();
}

function toggleWebcam() {
    if (!gestureRecognizer) {
        startBtn.textContent = t('lab.btn.loading');
        return;
    }
    webcamRunning ? stopWebcam() : startWebcam();
}

function stopWebcam() {
    webcamRunning = false;
    startBtn.textContent = t('lab.btn.start');

    if (videoSourceType === 'webcam' && video && video.srcObject) {
        video.srcObject.getTracks().forEach(t => t.stop());
        video.srcObject = null;
    } else if (ipImage) {
        ipImage.src = '';
    }

    if (video) video.style.display = 'block';
    if (ipImage) ipImage.style.display = 'none';
}

function startWebcam() {
    const url = streamUrlInput ? streamUrlInput.value.trim() : '';

    if (url.startsWith('http')) {
        videoSourceType = 'ip';
        if (ipImage) {
            ipImage.src = url;
            ipImage.style.display = 'block';
        }
        if (video) video.style.display = 'none';
        webcamRunning = true;
        startBtn.textContent = t('lab.btn.stop.stream');
        requestAnimationFrame(predictWebcam);
    } else {
        videoSourceType = 'webcam';
        if (video) video.style.display = 'block';
        if (ipImage) ipImage.style.display = 'none';

        navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } })
            .then(stream => {
                video.srcObject = stream;
                video.addEventListener('loadeddata', () => {
                    webcamRunning = true;
                    startBtn.textContent = t('lab.btn.stop.webcam');
                    requestAnimationFrame(predictWebcam);
                    // Inicia countdown automático ao ligar câmera no modo RPS
                    if (currentMode === 'rps') startRPSRound();
                }, { once: true });
            })
            .catch(err => {
                console.error('[LAB] Camera access denied:', err);
                if (gestureNameEl) gestureNameEl.textContent = 'Câmera negada';
            });
    }
}

async function predictWebcam(timestamp) {
    if (!webcamRunning || !gestureRecognizer || !canvas || !canvasCtx) return;

    const source = videoSourceType === 'webcam' ? video : ipImage;
    const nowInMs = Date.now();

    if (videoSourceType === 'webcam') {
        if (!video || video.currentTime === lastVideoTime || video.readyState < 2) {
            requestAnimationFrame(predictWebcam);
            return;
        }
        lastVideoTime = video.currentTime;
    }

    const vW = videoSourceType === 'webcam' ? video.videoWidth  : ipImage.naturalWidth;
    const vH = videoSourceType === 'webcam' ? video.videoHeight : ipImage.naturalHeight;

    if (vW > 0 && vH > 0) {
        canvas.width  = vW;
        canvas.height = vH;
        canvasCtx.clearRect(0, 0, vW, vH);

        try {
            canvasCtx.drawImage(source, 0, 0, vW, vH);
        } catch (_) { /* CORS - image element still visible */ }

        try {
            const results = gestureRecognizer.recognizeForVideo(source, nowInMs);

            if (results.landmarks && results.landmarks.length > 0) {
                const drawing = new DrawingUtils(canvasCtx);
                for (const landmarks of results.landmarks) {
                    drawing.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
                        color: '#00f2ff',
                        lineWidth: 2,
                    });
                    drawing.drawLandmarks(landmarks, {
                        color: '#ff00cc',
                        lineWidth: 1,
                        radius: 3,
                    });
                }
            }

            if (results.gestures.length > 0) {
                const g          = results.gestures[0][0];
                const mapped     = GESTURE_MAP[g.categoryName];
                const rpsMove    = RPS_MAP[g.categoryName];
                const letter     = mapped ? mapped.letter : g.categoryName;
                const confidence = Math.round(g.score * 100);

                // Legenda do vídeo depende do modo ativo
                const label = currentMode === 'rps'
                    ? (rpsMove ? `${rpsMove.emoji} ${rpsMove.name}` : '— não mapeado')
                    : (mapped  ? `${mapped.letter} — ${mapped.hint}` : g.categoryName);

                if (gestureNameEl) gestureNameEl.textContent = label;
                if (gestureConfidenceEl) gestureConfidenceEl.style.width = confidence + '%';
                checkGameLogic(g.categoryName, letter, confidence);
            } else {
                if (gestureNameEl) gestureNameEl.textContent = 'AGUARDANDO...';
                if (gestureConfidenceEl) gestureConfidenceEl.style.width = '0%';
            }
        } catch (err) {
            if (gestureNameEl) gestureNameEl.textContent = 'STREAM ATIVO (CORS block)';
        }

        const elapsed = nowInMs - lastPredictTime;
        if (elapsed > 0 && fpsDisplay) fpsDisplay.textContent = Math.min(99, Math.round(1000 / elapsed));
        lastPredictTime = nowInMs;
    }

    if (webcamRunning) requestAnimationFrame(predictWebcam);
}

/* — Game Logic — */

function checkGameLogic(rawGesture, detected, confidence) {
    if (confidence < 70) return;

    if (currentMode === 'symbols') {
        if (detected === lastGesture) return;
        const targetText = targetDisplay ? targetDisplay.textContent.split(' — ')[0] : '';
        if (targetDisplay && detected === targetText) {
            score++;
            if (scoreDisplay) scoreDisplay.textContent = score;
            lastGesture = detected;
            triggerSuccess();
            setTimeout(nextLetter, 900);
        }
    } else if (currentMode === 'rps') {
        if (rpsPhase !== 'capture') return;
        const playerMove = RPS_MAP[rawGesture];
        if (!playerMove) return;

        rpsPhase = 'result';

        const playerEl = document.getElementById('rps-player');
        const cpuEl    = document.getElementById('rps-cpu');
        const resultEl = document.getElementById('rps-result');

        // Mostra jogada do player imediatamente
        if (playerEl) { playerEl.textContent = playerMove.emoji; playerEl.classList.add('reveal'); }

        // Pequeno delay dramático antes de revelar a IA
        setTimeout(() => {
            // CPU escolhe aleatório
            const cpuMove = RPS_CHOICES[Math.floor(Math.random() * RPS_CHOICES.length)];
            if (cpuEl) { cpuEl.textContent = cpuMove.emoji; cpuEl.classList.add('reveal'); }

            // Determina resultado
            let outcome, outcomeClass;
            if (playerMove.name === cpuMove.name) {
                outcome = t('rps.draw');
                outcomeClass = 'draw';
            } else if (RPS_BEATS[playerMove.name] === cpuMove.name) {
                outcome = t('rps.win');
                outcomeClass = 'win';
                score++;
                if (scoreDisplay) scoreDisplay.textContent = score;
                triggerSuccess();
            } else {
                outcome = t('rps.lose');
                outcomeClass = 'lose';
            }

            if (resultEl) {
                resultEl.textContent = outcome;
                resultEl.className   = `rps-result ${outcomeClass}`;
            }

            // Próxima rodada após 2.5s
            setTimeout(startRPSRound, 2500);
        }, 500);
    }
}

function nextLetter() {
    if (!targetDisplay) return;
    let next;
    do {
        next = LETTERS_LIST[Math.floor(Math.random() * LETTERS_LIST.length)];
    } while (next === targetDisplay.textContent.split(' ')[0] && LETTERS_LIST.length > 1);

    // Encontra o hint correspondente
    const entry = Object.values(GESTURE_MAP).find(g => g.letter === next);
    targetDisplay.textContent = entry ? `${entry.letter} — ${entry.hint}` : next;
    lastGesture = '';
}

function triggerSuccess() {
    const lab = document.getElementById('gesture-lab');
    if (!lab) return;
    lab.style.boxShadow = `inset 0 0 35px var(--green)40`;
    setTimeout(() => lab.style.boxShadow = '', 600);
}
