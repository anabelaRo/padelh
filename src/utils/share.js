export const shareMatch = async (match) => {
  const text = `🎾 ¡Resultado de Pádel!\n📍 ${match.club}\n👥 ${match.p1}/${match.p2} vs ${match.p3}/${match.p4}\n🏆 Resultado: ${match.sets}`;
  
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Partido de Pádel', text });
    } catch (err) {
      console.log('Error al compartir', err);
    }
  } else {
    // Fallback: copiar al portapapeles
    navigator.clipboard.writeText(text);
    alert("Copiado al portapapeles");
  }
};
