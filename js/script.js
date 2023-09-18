$(function () {
  /* ===============================================
# headerのアンダーライン
=============================================== */
  jQuery(".header-nav-item-link").on("click", function () {
    // 全てのaタグのis-activeクラスを削除
    jQuery(".header-nav-item-link").removeClass("is-active");
    // クリックしたものに対してだけ、is-activeクラスを付与
    jQuery(this).addClass("is-active");
  });

  /* ===============================================
    # slider
    =============================================== */
  $(".slider").slick({
    slidesToShow: 4,

    // 何枚表示するか

    slidesToScroll: 1,

    // 何枚づつスクロールするか

    variableWidth: true,

    // 横幅がバラバラなスライドにするか

    infinite: true,

    // スライドをループさせるか [初期値:true]

    prevArrow: false,

    //前へボタンをオフ

    nextArrow: false,

    //   次へボタンをオフ

    dots: true,

    // 下部の点の表示

    // autoplay: true,

    // スライドの遷移

    autoplaySpeed: 2000,

    // スライド遷移のスピード
  });

  /* ===============================================
# qa-box
=============================================== */

  // qのボタンがクリックされた時
  jQuery(".qa_box_q").on("click", function () {
    jQuery(this).next().slideToggle();
    jQuery(this).children(".qa_box_icon").toggleClass("is-open");
  });

  /* ===============================================
# to-top
=============================================== */
  // totopを一定の位置までスクロールすると表示
  // windowをスクロール
  jQuery(window).on("scroll", function () {
    // 100px以上スクロールすると、is-showというclassがつく
    if (100 < jQuery(this).scrollTop()) {
      jQuery(".to-top").addClass("is-show");
      //   そうでないならis-showというclassは取り除かれる
    } else {
      jQuery(".to-top").removeClass("is-show");
    }
  });

  /* ===============================================
  # wow
  =============================================== */
  //   wowjs
  new WOW().init();

  /* ===============================================
# 目次をクリックしたら指定の位置までスクロール
=============================================== */
  jQuery('a[href^="#"]').click(function () {
    // ヘッダーの位置を取得（後でヘッダーの高さ分マイナスするから）
    var header = jQuery("header").innerHeight();
    // hrefの値を取得
    var id = jQuery(this).attr("href");
    // 基本ポジションは0を指定（to-topボタンを押したら一番上まで遡る）
    var position = 0;
    // もしidが＃単体じゃなかったら、positionは 各idからヘッダー分の高さを引いた場所に
    if (id != "#") {
      position = jQuery(id).offset().top - header;
    }

    // positionの位置までスクロールのアニメーション
    jQuery("html,body").animate(
      {
        // ポジションの位置までスクロール
        scrollTop: position,
      },
      // 0.3秒かけて
      300
    );
  });




  /* ===============================================
  # contact form
  =============================================== */
  // 必須項目
  var requireFlg = false;
  // プライバシーポリシー
  var privacyFlg = false;
  // 必須項目の入力フィールドを取得
  var $require = $(".js-required");

  var fillCount = 0;

  // 送信ボタンのdisabledの設定
  function setSubmitProp() {
    // 必須項目とプライバシーポリシーに同意している場合、送信ボタンを有効化
    if (requireFlg && privacyFlg) {
      $("#form-submit").prop("disabled", false);
    } else {
      // そうでない場合、送信ボタンを無効化
      $("#form-submit").prop("disabled", true);
    }
  }

  // 必須項目の入力フィールドからフォーカスが」外れた時の処理
  $require.on("blur", function () {
    // フリガナ欄で、全角カタカナ以外の文字が入力された場合
    if (
      $(this).attr("id") === "your-furigana" &&
      !$(this)
        .val()
        .match(/^([ァ-ン]|ー)+$/)
    ) {
      // フィールドをクリアしてエラーメッセージを表示
      $(this).val("");
      alert("全角カタカナで入力してください。");
    }
    // 各必須項目をチェックし、入力がある場合 fillCount を増やす
    $require.each(function () {
      var value = $(this).val();
      if (value !== "" && value.match(/[^\s\t]/)) {
        fillCount++;
      }
    });
    // console.log(fillCount);
    // console.log($require.length);
    // すべての必須項目が入力された場合、requireFlg を true に設定
    requireFlg = ( fillCount === $require.length ? true : false );
    // console.log(requireFlg)
    // 送信ボタンの状態を更新
    setSubmitProp();
    // fillCount をリセット
    fillCount = 0;
  });


  // プライバシーポリシーのチェックボックスの状態が変更されたときの処理
  $('#privacy-check').on('change', function() {
    // チェックボックスの状態を取得し、privacyFlg に設定
    privacyFlg = $(this).prop('checked');
    // 送信ボタンの状態を更新
    setSubmitProp();
  });

    // // フォームが送信されたときの処理
    // $('#js-contactForm').on('submit', function() {
    //   // 必須項目とプライバシーポリシーに同意していない場合、送信を中止しエラーメッセージを表示
    //   if (!(requireFlg && privacyFlg)) {
    //     alert('入力に誤りがあります。');
    //     return false; // 送信を中止
    //   }
    // });


    /* ===============================================
    # google form
    =============================================== */
    let $form = $('#js-form');
    $form.submit(function(e) { 
      $.ajax({ 
       url: $form.attr('action'), 
       data: $form.serialize(), 
       type: "POST", 
       dataType: "xml", 
       statusCode: { 
          0: function() { 
            //送信に成功したときの処理 
            $form.slideUp();
            $('#js-success').slideDown();
          }, 
          200: function() { 
            //送信に失敗したときの処理 
            $form.slideUp();
            $('#js-error').slideDown();
          }
        } 
      });
      return false; 
    }); 
});


