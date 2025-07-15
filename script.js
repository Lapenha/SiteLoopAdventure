document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });

  // Modal
  const modal = document.getElementById('modal');
  const closeModal = document.querySelector('.close');
  const buttons = document.querySelectorAll('.detalhes');

  const veiculos = {
    van: {
      titulo: "Van Executiva",
      desc: "Veículo espaçoso para viagens executivas e traslados.",
      capacidade: "15 passageiros",
      ano: "2020",
      comodidades: "Ar-condicionado, Poltronas reclináveis, Som",
      imagem: "img/van-executiva.png"
    },
    micro: {
      titulo: "Micro-ônibus Luxo",
      desc: "Conforto para até 28 passageiros, com ar-condicionado, TV, Wi-Fi e bagageiro amplo para suas viagens.",
      capacidade: "28 passageiros",
      ano: "2021",
      comodidades: "Ar-condicionado, Wi-Fi, TV, Bagageiro amplo, Frigobar",
      imagem: "img/microonibus-luxo.png"
    },
    suv: {
      titulo: "SUV Premium",
      desc: "Veículo 4x4 ideal para aventuras.",
      capacidade: "7 passageiros",
      ano: "2022",
      comodidades: "Ar-condicionado, Porta-malas amplo, Multimídia",
      imagem: "img/suv-premium.png"
    }
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.veiculo;
      const data = veiculos[key];

      document.getElementById('modal-img').src = data.imagem;
      document.getElementById('modal-titulo').textContent = data.titulo;
      document.getElementById('modal-desc').textContent = data.desc;
      document.getElementById('modal-capacidade').textContent = data.capacidade;
      document.getElementById('modal-ano').textContent = data.ano;
      document.getElementById('modal-comodidades').textContent = data.comodidades;

      modal.classList.remove('hidden');
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
});
