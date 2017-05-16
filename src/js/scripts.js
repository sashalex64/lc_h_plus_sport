var Modal = (function(){
  var addEvent = function(event, elem, func) {
     if (elem.addEventListener) {
        elem.addEventListener(event, func, false);
     } else if (elem.attachEvent) {
        elem.attachEvent("on"+event, func);
     }
  };

  var opened;
  var close;

  return {
    init: function() {
      if(document.getElementsByClassName) {
        this.handleImages();
        this.addClass();
      }
    },
    handleImages: function() {
      var productsSection = document.getElementById("products");
      if(productsSection) {
        var images = productsSection.getElementsByClassName("product-item");
        for (var i = 0, l = images.length; i<l; i++) {
          var image = images[i].getElementsByTagName('img')[0];
          if(image) {
            image.setAttribute("tabindex", 0);
            addEvent('click', image, this.handleOpenModal);
            addEvent('keydown', image, this.handleOpenModal);
            addEvent('keyup', image, this.focusModalClose);
          }
        }
      }
    },
    getKey: function(event) {
      var key = event.keyCode;
      if(!key && event.detail) {
        key = event.detail.key;
      }
      if(!key && event.detail) {
        key = '';
      }
      return key;
    },
    handleOpenModal: function(event) {
      var type = event.type;
      var target = event.target;

      if(type === 'keydown') {
        var key = Modal.getKey(event);
        if(key === 13 || key === 32) {
          Modal.openModal(target, type);
          if(event.preventDefault) {
            event.preventDefault();
          }
          if(event.stopPropagation) {
            event.stopPropagation();
          }
        }
      }
      if(type === 'click') {
        Modal.openModal(target, type);
      }
    },
    focusModalClose: function(event) {
      var key = Modal.getKey(event);
      if(key === 13 || key === 32) {
        Modal.close.focus();
      }
    },
    openModal: function(target, type) {
      var modal = document.getElementById("modal");
      var close;
      var image;

      opened = target;

      if(!modal) {
        modal = document.createElement("div");
        modal.id = "modal";
        modal.style.display = 'none';
        Modal.close = document.createElement("button");
        Modal.close.setAttribute("tabindex", 0);
        Modal.close.innerHTML = "Close";
        modal.appendChild(Modal.close);
        image = document.createElement("img");
        modal.appendChild(image);
        var backdrop = document.createElement("div");
        backdrop.setAttribute("class", "backdrop");
        modal.appendChild(backdrop);
        document.body.appendChild(modal);
        addEvent('click', Modal.close, this.handleCloseModal);
        addEvent('keydown', Modal.close, this.handleCloseModal);
      }
      if(!image) {
        image = modal.getElementsByTagName("img")[0];
      }
      image.src = target.src;
      modal.style.display = 'block';
      if(type === 'click') {
        Modal.close.focus();
      }
    },
    handleCloseModal: function(event) {
      var type = event.type;
      var target = event.target;

      if(type === 'keydown') {
        var key = event.keyCode;
        if(!key && event.detail) {
          key = event.detail.key;
        }
        if(!key && event.detail) {
          key = '';
        }
        if(key === 13 || key === 27 || key === 32) {
          Modal.closeModal();
          if(event.preventDefault) {
            event.preventDefault();
          }
          if(event.stopPropagation) {
            event.stopPropagation();
          }
        }
      }
      if(type === 'click') {
        Modal.closeModal();
      }
    },
    closeModal: function() {
      document.getElementById("modal").style.display = 'none';
      opened.focus();
    },
    addClass: function () {
      var currentClasses = document.body.getAttribute("class") || '';
      document.body.setAttribute("class", currentClasses + " modal-supported");
    }
  };
})();

window.onload = function() {
  Modal.init();
};